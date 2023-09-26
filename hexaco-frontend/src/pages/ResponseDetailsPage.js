import React, { useState, useEffect } from 'react';
import { Link, useParams  } from 'react-router-dom';
import Axios from 'axios';
import './ResponseDetailsPage.css';

const ResponseDetailsPage  = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedAssessmentType, setSelectedAssessmentType] = useState('');
  const {event_id } = useParams();
  const [users, setUsers] = useState([]);
  const [assessmentTypes, setAssessmentTypes] = useState([]);
  const [formResponses, setFormResponses] = useState([]);
  const [resultDetails, setResultDetails] = useState([]);

  console.log('event_id:', event_id)
  console.log('resultDetails:', resultDetails)


    useEffect(() => {
        fetch('http://localhost:5000/forms')
            .then(response => response.json())
            .then(data => setAssessmentTypes(data))
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
      Axios.get('http://localhost:5000/users')
        .then(response => setUsers(response.data))
        .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
      let url = 'http://localhost:5000/results';
      if (selectedEmployee) {
        url = `http://localhost:5000/results/${selectedEmployee}`;
      }
    
      fetch(url)
        .then((response) => response.json())
        .then((data) => setFormResponses(data))
        .catch((error) => console.error('Error:', error));
    
    }, [selectedEmployee, users]);

    useEffect(() => {
      let url = 'http://localhost:5000/result_details';
      if (event_id) {
        url = `http://localhost:5000/result_details/${event_id}`;
      }
    
      fetch(url)
        .then((response) => response.json())
        .then((data) => setResultDetails(data))
        .catch((error) => console.error('Error:', error));
    
    }, [resultDetails, event_id]);
    

    // Filter form responses based on selectedEmployee and selectedAssessmentType
    const filteredFormResponses = formResponses.filter((response) => {
      if (selectedEmployee && response.user_id !== parseInt(selectedEmployee)) {
        return false;
      }
      if (selectedAssessmentType && response.form_id !== selectedAssessmentType) {
        return false;
      }
      return true;
    }).map((response) => {
      const user = users.find((user) => user.id === response.user_id);
      const assessmentType = assessmentTypes.find((type) => type.id === response.form_id);
      //console.log(response)
      //console.log(user)
      return {
        ...response,
        firstName: user?.firstname || '',
        lastName: user?.lastname || '',
        assessmentTitle: assessmentType?.title || ''
      };
    });
    
  return (
    <div class="form-block">

        <div>
          <h1>Response Details Page</h1>
          <p>Response ID: {event_id}</p>
          {/* Display the details of the response */}
    </div>
            
    <div>
      <h1>Survey Results</h1>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Field Title</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {resultDetails.map((item, index) => (
            <tr key={index}>
              <td>{item.field_title}</td>
              <td>
                {item.answer_type === 'text' && item.answer_text}
                {item.answer_type === 'choice' && item.answer_choice_label}
                {item.answer_type === 'number' && item.answer_number}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    
</div>

  );
};

export default ResponseDetailsPage ;
