from config import API_TOKEN, EMAIL_PASS, EMAIL_USER, DATABASE_URL, params
import openai
import pandas as pd

import psycopg2
from sqlalchemy import create_engine
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

'''SHEET_ID = '1olmpT7S9SOXRlu6vNLoOisr4qpWNiEZMOkdvNBHKoPU'
SHEET_NAME = 'responses_1'
url = f'https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv&sheet={SHEET_NAME}'
df = pd.read_csv(url)
print(df.head())'''

import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pandas as pd

openai.api_key = API_TOKEN

def get_df_from_sheet(url, sheet_name, client):
    sheet = client.open_by_url(url).worksheet(sheet_name)

    # get all records in the sheet as a list of lists
    records = sheet.get_all_values()

    # create a DataFrame from the records
    df = pd.DataFrame.from_records(records[1:], columns=records[0])

    return df

#def get_sum_by_traits(df_response_recoded):

def get_input_burnout_data():
    # use creds to create a client to interact with the Google Drive API
    scope = ['https://spreadsheets.google.com/feeds',
            'https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name('hrgpt-381021-dc639aab9df3.json', scope)
    client = gspread.authorize(creds)

     # open the worksheet by URL
    url = 'https://docs.google.com/spreadsheets/d/1Ol3qcbbp68G8G80HUKM-rrGEybvCmqKFo1KH0SETO_w/edit#gid=1445374824'

    df_responses = get_df_from_sheet(url, 'form_responses', client)

    df_questions = get_df_from_sheet(url, 'questions_traits', client)

    df_scores = get_df_from_sheet(url, 'scores', client)


    print('df_responses:', df_responses)
    print('df_questions:', df_questions)
    print('df_scores:', df_scores)

    list_dicts_responses = df_responses.to_dict('records')

    persons = []

    #Iterate over response rows
    for index, item in enumerate(list_dicts_responses):
        
        person_responses = []
        #print(item)
        #if index > 0:
        #    continue
        
        #Iterate over questions
        for index_two, question in enumerate(item.keys()):
            response_row = {}
            response = item[question]
            if index_two < 2:
                continue

            #Now, given the question, find which scale to use: Frequency or Degree
            #print(index_two, question, response)
            scale = df_questions.loc[df_questions["Questions"] == question, 'Scale'].iloc[0]
            #print('scale:', scale)

            #Given scale, convert that into a number based on df_scores
            recoded_score = df_scores.loc[df_scores[scale] == response, 'Numeric'].iloc[0]
            #print('recoded score:', recoded_score)

            #Given question, find the corresponding trait based on df_questions
            trait = df_questions.loc[df_questions["Questions"] == question, "Traits"].iloc[0]
            #print('trait:', trait)

            response_row['question'] = question
            response_row['textual'] = response
            response_row['trait'] = trait
            #response_row['NR'] = nr_sign
            response_row['recoded'] = int(recoded_score)

            person_responses.append(response_row)

        df_responses_recoded = pd.DataFrame.from_dict(person_responses)

        print('df_responses_recoded', df_responses_recoded.head())

        trait_scores = df_responses_recoded.groupby('trait')['recoded'].mean()
        print('trait_scores:', trait_scores.head())

    
#Given textual score and question, return recoded score
#Find NR value of question from df_scores
#If N, take normal score
#If R, take reversed score
def get_recoded_score(text_score, question, df_scores, df_questions):
    #Find NR value of question
    #print(' question:', question)
    nr_value = df_questions.loc[df_questions["question"] == question, "NR"].iloc[0]
    #print(' nr_value:', nr_value)

    nr_column = 'Normal' #Normal by default

    if nr_value == 'R':
        nr_column = 'Reverse'

    #Find numeric score
    num_score = df_scores.loc[df_scores["Points"] == text_score, nr_column].iloc[0]
    #print(' numeric column:', nr_column)
    #print(' numeric score:', num_score)

    return nr_value, num_score


#Returns a ready prompt that will later go into chatgpt
def get_input_hexaco_data():
    # use creds to create a client to interact with the Google Drive API
    scope = ['https://spreadsheets.google.com/feeds',
            'https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name('hrgpt-381021-dc639aab9df3.json', scope)
    client = gspread.authorize(creds)

    # open the worksheet by URL
    url = 'https://docs.google.com/spreadsheets/d/1olmpT7S9SOXRlu6vNLoOisr4qpWNiEZMOkdvNBHKoPU/edit#gid=2042304068'

    df_hexaco = get_df_from_sheet(url, 'new_HEXACO_mapping', client)

    #print(df_hexaco.head())

    return df_hexaco

    #Get list of traits
    #df_traits = df_questions.groupby('trait')

    '''list_dicts_responses = df_responses.to_dict('records')

    persons = []

    #Iterate over response rows
    for index, item in enumerate(list_dicts_responses):
        
        person_responses = []
        #print(item)
        #if index > 0:
        #    continue
        
        #Iterate over questions
        for index_two, question in enumerate(item.keys()):
            response_row = {}
            response = item[question]
            #print(index, question, response)
            if index_two == 0:
                continue

            #Get Normal or Reverse sign, and recoded numerical score based on this sign
            nr_sign, recoded_score = get_recoded_score(response, question, df_scores, df_questions)

            trait = df_questions.loc[df_questions["question"] == question, "trait"].iloc[0]

            response_row['question'] = question
            response_row['textual'] = response
            response_row['trait'] = trait
            response_row['NR'] = nr_sign
            response_row['recoded'] = int(recoded_score)

            #print(response_row)

            person_responses.append(response_row)
        
        #print('Person responses:', person_responses)

        df_responses_recoded = pd.DataFrame.from_dict(person_responses)

        #print('df_responses_recoded', df_responses_recoded.head())

        trait_scores = df_responses_recoded.groupby('trait')['recoded'].sum()
        #print('trait_scores:', trait_scores.head())

    return trait_scores
    '''


#In general, we need four dataframes:
# df_responses (Q1 - very accurate)
# df_questions_traits (Q1 - agreebleness)
# df_scale (very accurate - 5, normal, reversed)
# df_results (person 1: trait1 - score 25, trait2 - score 30, etc.)

#Returns a ready prompt that will later go into chatgpt
def OLD_get_input_personality_data():
    # use creds to create a client to interact with the Google Drive API
    scope = ['https://spreadsheets.google.com/feeds',
            'https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name('hrgpt-381021-dc639aab9df3.json', scope)
    client = gspread.authorize(creds)

    # open the worksheet by URL
    url = 'https://docs.google.com/spreadsheets/d/1olmpT7S9SOXRlu6vNLoOisr4qpWNiEZMOkdvNBHKoPU/edit#gid=2042304068'

    df_responses = get_df_from_sheet(url, 'responses', client)

    df_questions = get_df_from_sheet(url, 'questions_traits', client)

    df_scores = get_df_from_sheet(url, 'scores', client)
    #df_hexaco = get_df_from_sheet(url, 'new_HEXACO_mapping', client)

    #Get list of traits
    #df_traits = df_questions.groupby('trait')

    list_dicts_responses = df_responses.to_dict('records')

    persons = []

    #Iterate over response rows
    for index, item in enumerate(list_dicts_responses):
        
        person_responses = []
        #print(item)
        #if index > 0:
        #    continue
        
        #Iterate over questions
        for index_two, question in enumerate(item.keys()):
            response_row = {}
            response = item[question]
            #print(index, question, response)
            if index_two == 0:
                continue

            #Get Normal or Reverse sign, and recoded numerical score based on this sign
            nr_sign, recoded_score = get_recoded_score(response, question, df_scores, df_questions)

            trait = df_questions.loc[df_questions["question"] == question, "trait"].iloc[0]

            response_row['question'] = question
            response_row['textual'] = response
            response_row['trait'] = trait
            response_row['NR'] = nr_sign
            response_row['recoded'] = int(recoded_score)

            #print(response_row)

            person_responses.append(response_row)
        
        #print('Person responses:', person_responses)

        df_responses_recoded = pd.DataFrame.from_dict(person_responses)

        #print('df_responses_recoded', df_responses_recoded.head())

        trait_scores = df_responses_recoded.groupby('trait')['recoded'].sum()
        #print('trait_scores:', trait_scores.head())

    return trait_scores

# Function to send a message to the OpenAI chatbot model and return its response
def send_message(message_log):
    # Use OpenAI's ChatCompletion API to get the chatbot's response
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # The name of the OpenAI chatbot model to use
        messages=message_log,   # The conversation history up to this point, as a list of dictionaries
        max_tokens=3800,        # The maximum number of tokens (words or subwords) in the generated response
        stop=None,              # The stopping sequence for the generated response, if any (not used here)
        temperature=0.7,        # The "creativity" of the generated response (higher temperature = more creative)
    )

    # Find the first response from the chatbot that has text in it (some responses may not have text)
    for choice in response.choices:
        if "text" in choice:
            return choice.text

    # If no response with text is found, return the first response's content (which may be empty)
    return response.choices[0].message.content

def send_email(message_body, recipient_email):
    
    # Set up the SMTP server
    smtp_server = 'smtp.office365.com'
    smtp_port = 587
    smtp_username = EMAIL_USER
    smtp_password = EMAIL_PASS
    smtp_connection = smtplib.SMTP(smtp_server, smtp_port)
    smtp_connection.starttls()
    smtp_connection.login(smtp_username, smtp_password)

    print('SMTP Server setup complete')

    # Set up the email message
    message = MIMEMultipart()
    message['From'] = EMAIL_USER
    message['To'] = recipient_email
    message['Subject'] = 'HR GPT Assesment Results'
    #body = 'Body of your email'
    message.attach(MIMEText(message_body, 'plain'))

    print('Sending message ...')

    # Send the email
    smtp_connection.sendmail(smtp_username, recipient_email, message.as_string())

    print('Message sent')

    # Close the connection
    smtp_connection.quit()

def ask_gpt_about_observant(aggregated_scores_traits, specific_observant_id, form_id):

    print('     Generating report for observant:', specific_observant_id)
    
    # Initialize the conversation history with a message from the chatbot
    filtered_df_traits = aggregated_scores_traits.loc[aggregated_scores_traits['observant_id'] == specific_observant_id]

    message_log = [
        {"role": "system", "content": "You are a helpful assistant."}
    ]

    user_input = '''I have a 40 year old person with the following IPIP personality traits:
    %s
    Will this person be suitable for the Product Owner role in a pharmaceutical company? 
    Please comment on each of the traits separately and then summarize the recommendation, giving an overall score on 0-100 scale. Pretend that I gave you some IPIP traits.
    ''' % filtered_df_traits

    message_log.append({"role": "user", "content": user_input})
    #message_log.append({"role": "assistant", "content": "You are a helpful assistant."})
    # Send the conversation history to the chatbot and get its response
    response = send_message(message_log)

    # Add the chatbot's response to the conversation history and print it to the console
    message_log.append({"role": "assistant", "content": response})
    print(f"AI assistant: {response}")

    return response

# Main function that runs the chatbot
def run_gpt_function(observant_id, form_id):

    # Create an engine
    engine = create_engine(f"postgresql+psycopg2://{params['user']}:{params['password']}@{params['host']}:{params['port']}/{params['dbname']}")

    # Establish the connection
    conn = psycopg2.connect(**params)

    # Query to fetch data from the table
    query_questions = "SELECT * FROM public.fields"
    query_answers = "SELECT * FROM public.answers"
    query_form_responses = "SELECT * FROM public.form_responses" #we need this to get user_id of the ones that submitted the answers

    # Use pandas to read the table into a DataFrame
    df_questions = pd.read_sql(query_questions, conn)
    df_answers = pd.read_sql(query_answers, conn)
    df_form_responses = pd.read_sql(query_form_responses, conn)

    # Close the connection
    conn.close()

    # Display the data
    #print(df_questions)
    #print(df_answers)

    #Goal: create a results table with aggregated scores
    #Take df.question_id
    #results_df = get_results_table(input_mapping, df)
    #response_id                |   composited_field_id                         |   field_id        |   answer(depends on type)     |   trait               |   facet                   |   code
    #___________________________|_____________________________________________  |__________________ | ____________________________  |  ___________________  |__________________________ | __________
    #01H8C6DARPBSPHTK6NW2SA1RQ  |   01H8C6DARPBSPHTK6NW2SA1RQ7:::zWhyrTBgOR9C   |   zWhyrTBgOR9C    |              4                |   Открытость к опыту  |   Эстетическое восприятие |     R 

    joined = pd.merge(df_answers, df_questions, left_on='field_id', right_on='composite_id', how = 'left')

    #print(sorted(joined.columns))
    #print(joined.head())

    #print(joined[['form_response_id_x', 'composite_id', 'field_nonunique_id', 'answer_number']])

    print('Getting input data on HEXACO mapping...')
    input_mapping = get_input_hexaco_data()

    joined_traits = pd.merge(joined, input_mapping, left_on='field_nonunique_id', right_on='question_id', how = 'left')
    #print(joined.head())
    print(joined_traits[['form_response_id_x', 'composite_id', 'field_nonunique_id', 'answer_number', 'Trait', 'Facet', 'NRCode']])

    joined_traits_w_users = pd.merge(joined_traits, df_form_responses, left_on='form_response_id_x', right_on='event_id', how = 'left')
    #print(joined.head())
    print(joined_traits_w_users[['observant_id', 'form_id', 'form_response_id_x', 'user_id', 'composite_id', 'field_nonunique_id', 'answer_number', 'Trait', 'Facet', 'NRCode']])

    # 1. Filter out missing values
    df_clean = joined_traits_w_users.dropna(subset=['answer_number'])

    df_clean.to_sql('df_merged_results', engine, if_exists='replace')

    # 2. Aggregate scores for each facet & trait
    aggregated_scores_facets = df_clean.groupby(['observant_id','form_id', 'Trait', 'Facet']).agg({'answer_number': 'mean'}).reset_index()
    aggregated_scores_traits = df_clean.groupby(['observant_id','form_id', 'Trait']).agg({'answer_number': 'mean'}).reset_index()

    print(aggregated_scores_facets.head())
    print(aggregated_scores_traits.head())

    aggregated_scores_facets.to_sql('aggregated_scores_facets', engine, if_exists='replace')
    aggregated_scores_traits.to_sql('aggregated_scores_traits', engine, if_exists='replace')

    #Asking ChatGPT
    print('Asking ChatGPT for recommendation...')

    #Generate reports for each observant
    # Loop over each unique observant_id and apply the function
    #for observant_id in aggregated_scores_facets[['observant_id','form_id']].unique():
        
    # Create an empty reports DataFrame
    df_reports = pd.DataFrame(columns=['report_id', 'observant_id', 'assessment_id', 'report_text'])

    unique_combinations = aggregated_scores_traits[['observant_id', 'form_id']].drop_duplicates().values

    #Retrieve report from GPT and save it to the reports table
    #report_id | observant_id | assessment_id (form_id) | report_text
    for observant_id, form_id in unique_combinations:
        print(observant_id, form_id)
        observant_report_text = ask_gpt_about_observant(aggregated_scores_traits, observant_id, form_id)

        # Append the new report to the reports DataFrame
        # If report_id is an auto-incremented value, you can handle that separately
        '''new_report = {
            'report_id': len(df_reports) + 1,  # Just an example, adapt as needed
            'observant_id': observant_id,
            'assessment_id': form_id,
            'report_text': observant_report_text
        }'''

        # Append the new report to the reports DataFrame using loc
        new_report_id = len(df_reports) + 1  # example for report_id
        df_reports.loc[new_report_id] = [new_report_id, observant_id, form_id, observant_report_text]

        #df_reports = df_reports.append(new_report, ignore_index=True)
    
    df_reports.to_sql('gpt_reports', engine, if_exists='replace')

    #Return only report for that observant_id and form_id
    filtered_reports_df = df_reports[(df_reports['observant_id'] == observant_id) & (df_reports['assessment_id'] == form_id)]
    report_text_values = filtered_reports_df['report_text'].values
    report_text = report_text_values[0]

    return report_text    

def OLD_run_gpt_function():

    #Send email
    #send_email()

    #exit()
    print('Getting input data on burnout...')
    input_burnout_data = get_input_burnout_data()
    exit()


    #Getting input data
    print('Getting input data on traits...')
    #input_personality_data = get_input_personality_data()


    #Asking ChatGPT
    print('Asking ChatGPT for recommendation...')
 
    # Initialize the conversation history with a message from the chatbot
    message_log = [
        {"role": "system", "content": "You are a helpful assistant."}
    ]

    user_input = '''I have a 40 year old person with the following IPIP personality traits:
    %s
    Will this person be suitable for the Product Owner role in a pharmaceutical company? 
    Please comment on each of the traits separately and then summarize the recommendation, giving an overall score on 0-100 scale. Pretend that I gave you some IPIP traits.
    ''' #% input_personality_data

    message_log.append({"role": "user", "content": user_input})
    #message_log.append({"role": "assistant", "content": "You are a helpful assistant."})
    # Send the conversation history to the chatbot and get its response
    response = send_message(message_log)

    # Add the chatbot's response to the conversation history and print it to the console
    message_log.append({"role": "assistant", "content": response})
    print(f"AI assistant: {response}")

    #send_email(response, 'darius52@gmail.com')


# Call the main function if this file is executed directly (not imported as a module)
if __name__ == "__main__":
    run_gpt_function(12, "dHwfnWvK")






