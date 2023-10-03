from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_bcrypt import check_password_hash
from flask_bcrypt import generate_password_hash
from flask_migrate import Migrate
from datetime import datetime
from sqlalchemy import orm
from flasgger import Swagger
# from config import SECRET_KEY, JWT_SECRET_KEY, DATABASE_URL

SECRET_KEY = 'TGj6G/6D4*pa\V'
JWT_SECRET_KEY = 'x!);QknF/6j*WA'
DATABASE_URL = 'postgresql://agzid:0#WGoQB3E23xq4@localhost/hrgpt'

import json
from gpt_module import run_gpt_function  # Import the function

## MAKE SURE that you are in venv virtual environemt: source my_flask_app/venv/bin/activate
## TO RUN: 
# cd scripts
# flask run --host=0.0.0.0

# Custom JSON encoder to handle non-serializable objects
class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, orm.collections.InstrumentedList):
            # Handle SQLAlchemy InstrumentedList (list-like) objects
            return list(obj)
        elif isinstance(obj, Field):
            # Handle the Field objects, convert to a dictionary
            return {
                'id': obj.id,
                # Add other fields as needed
            }
        return super().default(obj)



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SECRET_KEY'] = SECRET_KEY  # Replace with your own secret key
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY  # Replace with your own JWT secret key

#CORS(app, resources={r"/*": {"origins": "http://localhost:3001"}})
#CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/*": {"origins": ["http://localhost:8080",
"http://localhost:3000", "http://localhost:3001", "http://45.136.58.205:3000", "http://45.136.58.205:3001",
"http://45.136.58.205:8080"
]}})

db = SQLAlchemy(app)
jwt = JWTManager(app)


app.json_encoder = CustomJSONEncoder

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(255), nullable=True)
    lastname = db.Column(db.String(255), nullable=True)
    username = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'))
    #form_responses = db.relationship('FormResponse', backref='user', lazy=True)  # Add form_responses relationship


    def __repr__(self):
        return f'<User {self.username}>'

class Group(db.Model):
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    users = db.relationship('User', backref='group', lazy=True)

    def __repr__(self):
        return f'<Group {self.name}>'

# Similarly, create the other models: Question, Response, Report, Observer
class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<Question {self.question_text}>'

class Response(db.Model):
    __tablename__ = 'responses'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    response_text = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<Response {self.response_text}>'

class Report(db.Model):
    __tablename__ = 'reports'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    report_text = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<Report {self.report_text}>'

class Observer(db.Model):
    __tablename__ = 'observers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<Observer {self.email}>'

class Form(db.Model):
    id = db.Column(db.String(255), primary_key=True)
    title = db.Column(db.String(255))

class FormResponse(db.Model):
    __tablename__ = 'form_responses'
    event_id = db.Column(db.String, primary_key=True)
    form_id = db.Column(db.String, nullable=False)
    token = db.Column(db.String, nullable=False)
    submitted_at = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # User - is the one who fills out the survey
    observant_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Observant - is the one who is the survey about
    user = db.relationship('User', backref='responses', foreign_keys=[user_id])
    observant = db.relationship('User', backref='observations', foreign_keys=[observant_id])
    #fields = db.relationship('Field', backref='form_response', lazy=True)

class Field(db.Model):
    __tablename__ = 'fields'
    #id = db.Column(db.Integer, primary_key=True, autoincrement=True) #Autoincrementing unique id
    composite_id = db.Column(db.String, primary_key=True) #this should consist from form_response_id + field_nonunique_id
    field_nonunique_id = db.Column(db.String, index=True) #Field ID from Typeform
    form_response_id = db.Column(db.String, db.ForeignKey('form_responses.event_id'), nullable=False)
    field_type = db.Column(db.String, nullable=False)
    field_title = db.Column(db.String, nullable=False)

    answers = db.relationship('Answer', backref='field', lazy=True)
    #hexaco_mapping = db.relationship('Hexaco', backref='field', lazy=True)  # New relationship

class Hexaco(db.Model):
    __tablename__ = 'hexaco_mapping'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True) # Autoincrementing unique id for the trait table

    # Fields as you specified:
    field_nonunique_id = db.Column(db.String, nullable=False) # Relating this field to the fields table
    question_text = db.Column(db.String, nullable=False) # Relating this field to the fields table
    question_number = db.Column(db.Integer, nullable=False) # Relating this field to the fields table
    Trait = db.Column(db.String, nullable=False)  # Trait text
    Facet = db.Column(db.String, nullable=False)  # Facet text
    NRCode = db.Column(db.String, nullable=False)   # Code, can be N or R, you can also add validation to ensure only these values.

class Answer(db.Model):
    __tablename__ = 'answers'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    field_id = db.Column(db.String, db.ForeignKey('fields.composite_id'), nullable=False)
    form_response_id = db.Column(db.String, nullable=False)
    answer_type = db.Column(db.String, nullable=False)
    answer_text = db.Column(db.String)
    answer_choice_id = db.Column(db.String)
    answer_choice_label = db.Column(db.String)
    answer_number = db.Column(db.Float)

class Scheduled_Individual(db.Model):
    __tablename__ = 'scheduled_individual_assessments'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    assessment_category = db.Column(db.String, nullable=False) #Individual or Group
    selected_assessment = db.Column(db.String, db.ForeignKey('form.id'), nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('users.id')) #The one being observed
    observer_id = db.Column(db.Integer, db.ForeignKey('users.id')) #The one observing
    scheduled_timestamp = db.Column(db.DateTime, nullable=False) #When to send the assessment

class Scheduled_Group(db.Model):
    __tablename__ = 'scheduled_group_assessments'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    assessment_category = db.Column(db.String, nullable=False) #Individual or Group
    selected_assessment = db.Column(db.String, db.ForeignKey('form.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id')) #The one being observed
    scheduled_timestamp = db.Column(db.DateTime, nullable=False) #When to send the assessment

#Write the scheduled assignment to DB
#Needed inputs:
    #selectedEmployee
    #selectedGroup
    #selectedObserver
    #selectedAssessmentType
    #scheduleDate
    #scheduleTime

@app.route('/schedule-assessment', methods=['POST']) #give form_response_id
def write_assigned_assessments():
    def combine_datetime(scheduleDate, scheduleTime):
        # Parse the dates from the provided strings
        date_obj = datetime.strptime(scheduleDate, '%Y-%m-%dT%H:%M:%S.%fZ')
        time_obj = datetime.strptime(scheduleTime, '%Y-%m-%dT%H:%M:%S.%fZ')

        # Combine the date from scheduleDate and time from scheduleTime
        combined_datetime = datetime(
            date_obj.year,
            date_obj.month,
            date_obj.day,
            time_obj.hour,
            time_obj.minute,
            time_obj.second,
            time_obj.microsecond
        )

        return combined_datetime.strftime('%Y-%m-%dT%H:%M:%S.%fZ')

    data = request.get_json()
    print(data)

    scheduleDate = data['scheduleDate'] 
    scheduleTime = data['scheduleTime']
    
    scheduleTimestamp = combine_datetime(scheduleDate, scheduleTime)

    if data['selectedAssessmentCategory'] == 'individual':
        new_scheduled_assignment = Scheduled_Individual(
            assessment_category=data['selectedAssessmentCategory'],
            employee_id=data['selectedEmployee'],
            observer_id=data['selectedObserver'],
            selected_assessment=data['selectedAssessmentType'],
            scheduled_timestamp=scheduleTimestamp
        )
    elif data['selectedAssessmentCategory'] == 'group':
        new_scheduled_assignment = Scheduled_Group(
            assessment_category=data['selectedAssessmentCategory'],
            group_id=data['selectedGroup'],
            selected_assessment=data['selectedAssessmentType'],
            scheduled_timestamp=scheduleTimestamp
        )
    
    db.session.add(new_scheduled_assignment)
    db.session.commit()

    return jsonify(message='Assignment scheduled'), 201

@app.route('/webhook', methods=['POST'])
def typeform_webhook():
    # Retrieve the webhook payload from Typeform
    data = request.json

    #print(data)
    # Process the webhook payload and extract relevant information
    # For example, you can access the responses using data['form_response']['answers']
    # Perform any required logic or save the data to your database
    # 

    # Process the webhook payload and extract relevant information
    event_id = data['event_id']
    form_response = data['form_response']
    form_id = form_response['form_id']
    user_id = form_response['hidden']['user_id'] #MAKE SURE THAT TYPEFORM FORM USES USER_ID HIDDEN FIELD
    observant_id = form_response['hidden']['observant_id'] #MAKE SURE THAT TYPEFORM FORM USES USER_ID HIDDEN FIELD
    #FOR TESTING PURPOSES
    if user_id == 'hidden_value':
        user_id = 12 #corresponds to pemp4 in users table
    if user_id == '52':
        user_id = 13
    #https://www.typeform.com/help/a/using-hidden-fields-360052676612/?tid=8857ca04-32f2-46d2-861f-a39c91014daa
    token = form_response['token']
    submitted_at = form_response['submitted_at']

    # Save the form response to the database
    form_response_db = FormResponse(event_id = event_id, form_id=form_id, user_id = user_id, observant_id = observant_id, token=token, submitted_at=submitted_at)
    db.session.add(form_response_db)
    db.session.commit()

    # Process the fields and answers
    fields = form_response['definition']['fields']
    field_auto_ids = []
    for field in fields:
        field_id = field['id']
        field_type = field['type']
        field_title = field['title']

        # Save the field to the database
        field_db = Field(composite_id = event_id + ':::' + field_id, field_nonunique_id=field_id, form_response_id=event_id, field_type=field_type, field_title=field_title)

        db.session.add(field_db)
        db.session.commit()

    #TODO: move answers out of field loop - one field - one answer
    # Process the answers
    answers = form_response['answers']
    for answer in answers:
        answer_type = answer['type']
        answer_field_id = answer['field']['id']

        if answer_type == 'text':
            answer_text = answer['text']
            # Save the answer to the database
            answer_db = Answer(field_id=event_id + ':::' + answer_field_id, form_response_id = event_id, answer_type=answer_type, answer_text=answer_text)
            print('Answer added:', answer_db.field_id, answer_type, answer_text)
            db.session.add(answer_db)
            db.session.commit()

        elif answer_type == 'choice':
            #answer_choice_id = answer['choice']['id']
            answer_choice_label = answer['choice']['label']
            # Save the answer to the database
            answer_db = Answer(field_id=event_id + ':::' + answer_field_id, form_response_id = event_id, answer_type=answer_type, answer_choice_label=answer_choice_label)
            print('Answer added:', answer_db.field_id, answer_type, answer_choice_label)
            db.session.add(answer_db)
            db.session.commit()

        elif answer_type == 'number':
            answer_number = answer['number']
            # Save the answer to the database
            answer_db = Answer(field_id=event_id + ':::' + answer_field_id, form_response_id = event_id, answer_type=answer_type, answer_number=answer_number)
            print('Answer added:', answer_db.field_id, answer_type, answer_number)
            db.session.add(answer_db)
            db.session.commit()
       
    # Send a response back to Typeform
    response = {'status': 'success'}
    return jsonify(response), 200

@app.route('/result_details/<event_id>') #give form_response_id
def get_result_details(event_id):

    fields_data = Field.query.filter_by(form_response_id=event_id).all()

    response_data = []
    for field in fields_data:         
        answers_data = Answer.query.filter_by(field_id=field.composite_id).all()
        for answer in answers_data:

            response_data.append({
                'form_response_id': field.form_response_id,
                'field_composite_id': field.composite_id,
                'field_nonunique_id': field.field_nonunique_id,
                'field_type': field.field_type,
                'field_title': field.field_title,
                'answer_id': answer.id,
                'answer_type': answer.answer_type,
                'answer_text': answer.answer_text,
                'answer_choice_id': answer.answer_choice_id,
                'answer_choice_label': answer.answer_choice_label,
                'answer_number': answer.answer_number
            })

    #return jsonify(response_data)
    #0return jsonify(response_data), 200, {'Content-Type': 'application/json; charset=utf-8', 'indent': 4}

    response = app.response_class(
        response=json.dumps(response_data, ensure_ascii=False, indent=4),
        status=200,
        mimetype='application/json'
    )

    return response

#This is used by Results (overview) page to show list of responses for each user
@app.route('/results/', defaults={'user_id': None})
@app.route('/results/<int:user_id>')
def get_results(user_id):
    if user_id is None:
        # Fetch form responses for all users from the database
        form_responses = FormResponse.query.all()
    else:
        # Fetch form responses for the selected user from the database
        form_responses = FormResponse.query.filter_by(user_id=user_id).all()

    # Serialize the form responses into a list of dictionaries
    form_responses_data = [
        {
            'event_id': response.event_id,
            'form_id': response.form_id,
            'submitted_at': response.submitted_at,
            'user_id': response.user_id
            # Add other fields as needed
        }
        for response in form_responses
    ]

    return jsonify(form_responses_data)


@app.route('/forms', methods=['GET'])
def get_forms():
    forms = Form.query.all()
    form_data = []
    for form in forms:
        form_data.append({
            'id': form.id,
            'title': form.title
        })
    return jsonify(form_data)

@app.route('/form_responses/', defaults={'event_id': None})
@app.route('/form_responses/<event_id>')
#@app.route('/form_responses', methods=['GET'])
def get_form_responses(event_id):
    if event_id is None:
        # Fetch form responses for all users from the database
        form_responses = FormResponse.query.all()
    else:
        # Fetch form responses for the selected user from the database
        form_responses = FormResponse.query.filter_by(event_id=event_id).all()

    #form_responses = FormResponse.query.all()
    response_data = []
    for response in form_responses:
        response_data.append({
            'event_id': response.event_id,
            'form_id': response.form_id,
            'token': response.token,
            'user_id': response.user_id,
            'submitted_at': response.submitted_at
        })
    return jsonify(response_data)

@app.route('/fields', methods=['GET'])
def get_fields():
    fields = Field.query.all()
    field_data = []
    for field in fields:
        field_data.append({
            'id': field.id,
            'form_response_id': field.form_response_id,
            'field_id': field.field_id,
            'field_type': field.field_type,
            'field_title': field.field_title
        })
    return jsonify(field_data)

@app.route('/answers', methods=['GET'])
def get_answers():
    answers = Answer.query.all()
    answer_data = []
    for answer in answers:
        answer_data.append({
            'id': answer.id,
            'field_id': answer.field_id,
            'answer_type': answer.answer_type,
            'answer_text': answer.answer_text,
            'answer_choice_id': answer.answer_choice_id,
            'answer_choice_label': answer.answer_choice_label,
            'answer_number': answer.answer_number
        })
    return jsonify(answer_data)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    # Find the user based on the email
    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        # User not found or password incorrect
        return jsonify(error='Invalid credentials'), 401

    # Generate and return an access token
    access_token = create_access_token(identity=user.id)
    return jsonify(token=access_token), 200

@app.route('/groups', methods=['POST'])
def create_group():
    data = request.json
    group_name = data.get('name')
    user_ids = data.get('user_ids', [])

    # Create the group
    group = Group(name=group_name)
    db.session.add(group)
    db.session.commit()

    # Add users to the group
    for user_id in user_ids:
        user = User.query.get(user_id)
        if user:
            user.group = group
            db.session.commit()

    return jsonify({'message': 'Group created successfully'})

@app.route('/groups', methods=['GET'])
def get_groups():
    groups = Group.query.all()
    group_list = [{'id': group.id, 'name': group.name} for group in groups]
    return jsonify(group_list)

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data['username']
    email = data['email']
    role = data['role']
    password = generate_password_hash(data['password']).decode('utf8')

    new_user = User(username=username, role=role, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message='User created'), 201

@app.route('/users', methods=['GET'])
def get_users():
    """
    Example endpoint returning a list of users
    ---
    tags:
      - Users
    descriptions: Returns a list of user details
    produces:
      - application/json
    responses:
      200:
        description: A list of user data
        schema:
          type: array
          items:
            type: object
            properties:
              id:
                type: integer
                description: The user's id
              username:
                type: string
                description: The user's username
              email:
                type: string
                description: The user's email
              firstname:
                type: string
                description: The user's first name
              lastname:
                type: string
                description: The user's last name
              role:
                type: string
                description: The user's role
    """
    users = User.query.all()
    #result = jsonify([user.username for user in users])
    user_data = [
        {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'firstname': user.firstname,
            'lastname': user.lastname,
            'role': user.role
        } for user in users
    ]
    #print(result)
    return jsonify(user_data)

@app.route('/observers', methods=['POST'])
def create_observer():
    data = request.get_json()
    user_id = data['user_id']
    email = data['email']
    new_observer = Observer(user_id=user_id, email=email)
    db.session.add(new_observer)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 400

    return jsonify(message='Observer created'), 201

@app.route('/questions', methods=['GET'])
def get_questions():
    questions = Question.query.all()
    question_data = [
        {'id': question.id, 'text': question.question_text} for question in questions
    ]
    return jsonify(question_data)

@app.route('/responses', methods=['POST'])
def create_response():
    data = request.get_json()
    user_id = data['user_id']
    responses = data['responses']

    for response in responses:
        question_id = response['question_id']
        response_text = response['response_text']
        new_response = Response(user_id=user_id, question_id=question_id, response_text=response_text)
        db.session.add(new_response)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 400

    return jsonify(message='Responses created'), 201

@app.route('/generate-report/<observant_id>/<form_id>', methods=['GET'])
def generate_report(observant_id, form_id):
    # Call your Python function here
    # For example: result = run_python_script()
    result = run_gpt_function(observant_id, form_id)
    # Return result to the frontend
    return jsonify({"report": result})
'''
@app.route('/webhook', methods=['POST'])
def process_webhook():
    data = request.get_json()
    print(data)
    return jsonify(message='Webhook received'), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
    '''
migrate = Migrate(app, db)

swagger = Swagger(app)

#if __name__ == '__main__':
#    app.run(host='0.0.0.0', port=5000)