from config import API_TOKEN, EMAIL_PASS, EMAIL_USER, DATABASE_URL, params
import openai
import pandas as pd
import datetime

import psycopg2
from sqlalchemy import create_engine
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pandas as pd

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
    message.attach(MIMEText(message_body, 'html'))

    print('Sending message ...')

    # Send the email
    smtp_connection.sendmail(smtp_username, recipient_email, message.as_string())

    print('Message sent')

    # Close the connection
    smtp_connection.quit()

# Main function that runs the chatbot
def read_scheduled_assessments(observant_id, form_id):

    # Create an engine
    engine = create_engine(f"postgresql+psycopg2://{params['user']}:{params['password']}@{params['host']}:{params['port']}/{params['dbname']}")

    # Establish the connection
    conn = psycopg2.connect(**params)

    # Query to fetch data from the table
    scheduled_individual_assessments = "SELECT * FROM public.scheduled_individual_assessments"
    scheduled_group_assessments = "SELECT * FROM public.scheduled_group_assessments"
    df_users_query = "SELECT * FROM public.users"
    df_groups_query = "SELECT * FROM public.groups"

    # Use pandas to read the table into a DataFrame
    df_scheduled_ind_assessments = pd.read_sql(scheduled_individual_assessments, conn)
    df_scheduled_group_assessments = pd.read_sql(scheduled_group_assessments, conn)
    df_users = pd.read_sql(df_users_query, conn)
    df_groups = pd.read_sql(df_groups_query, conn)

    current_time = datetime.datetime.now()
    next_fifteen_minutes = current_time + datetime.timedelta(minutes=15)

    # Filter out assessments that are scheduled within the current minute
    '''df_scheduled_ind_assessments = df_scheduled_ind_assessments[
        (df_scheduled_ind_assessments['scheduled_timestamp'] >= current_time) & 
        (df_scheduled_ind_assessments['scheduled_timestamp'] < next_fifteen_minutes)
    ]

    df_scheduled_group_assessments = df_scheduled_group_assessments[
        (df_scheduled_group_assessments['scheduled_timestamp'] >= current_time) & 
        (df_scheduled_group_assessments['scheduled_timestamp'] < next_fifteen_minutes)
    ]'''

    print(df_scheduled_ind_assessments)
    print(df_scheduled_group_assessments)
    print(df_users)

    # https://frlnipppr79.typeform.com/to/dHwfnWvK#user_id=xxxxx&observant_id=xxxxx
    base_assessment_url = "https://frlnipppr79.typeform.com/to/dHwfnWvK"


     # Send emails for individual assessments
    for index, row in df_scheduled_ind_assessments.iterrows():
        message_body = "Your message content here for individual assessments"

        #Get observer info for message body
        observer = df_users[df_users['id'] == row['observer_id']]
        observer_first_name = observer['firstname'].values[0]
        observer_last_name = observer['lastname'].values[0]

        #Get observer email for sending the email
        observer_email = observer['email'].values[0]

        #Get employee info for message body
        employee = df_users[df_users['id'] == row['employee_id']]
        employee_first_name = employee['firstname'].values[0]
        employee_last_name = employee['lastname'].values[0]

        # Generate the email message body
        message_body = f"""
        Здравствуйте, {observer_first_name} {observer_last_name},

        Мы бы хотели попросить Вас заполнить оценку для {employee_first_name} {employee_last_name}.

        Пожалуйста, перейдите по следующей ссылке для завершения оценки:

        {base_assessment_url}#user_id={row['employee_id']}&observant_id={row['observer_id']}

        Заранее благодарим за сотрудничество!

        С наилучшими пожеланиями,
        Ваш отдел кадров
        """

        # Формируем текст письма
        message_body = f"""
        <html>
        <head>
            <style>
                .button {{
                    display: inline-block;
                    padding: 10px 20px;
                    font-size: 20px;
                    cursor: pointer;
                    text-align: center;
                    text-decoration: none;
                    outline: none;
                    color: #fff;
                    background-color: #4CAF50;
                    border: none;
                    border-radius: 15px;
                    box-shadow: 0 9px #999;
                }}

                .button:hover {{
                    background-color: #45a049;
                }}

                .button:active {{
                    background-color: #3e8e41;
                    box-shadow: 0 5px #666;
                    transform: translateY(4px);
                }}
            </style>
        </head>
        <body>
            <p>Здравствуйте, {observer_first_name} {observer_last_name},</p>
            <p>Мы бы хотели попросить Вас заполнить оценку для {employee_first_name} {employee_last_name}.</p>
            <a href="{base_assessment_url}#user_id={row['employee_id']}&observant_id={row['observer_id']}" class="button">Заполнить оценку</a>
            <p>Заранее благодарим за сотрудничество!</p>
            <p>С наилучшими пожеланиями,<br>Ваш отдел кадров</p>
        </body>
        </html>
        """

        print(message_body)







        

        #send_email(message_body, recipient_email)  # Define recipient_email

        # Mark this record as emailed in the database
        # This would involve updating the is_emailed column for this record to True

    # Send emails for group assessments
    for index, row in df_scheduled_group_assessments.iterrows():
        message_body = "Your message content here for group assessments"
        #send_email(message_body, recipient_email)  # Define recipient_email

    # Close the connection
    conn.close()

    


# Call the main function if this file is executed directly (not imported as a module)
if __name__ == "__main__":
    read_scheduled_assessments(12, "dHwfnWvK")






