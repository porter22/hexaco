import React, { useState, useEffect } from 'react';
import { Link, useParams  } from 'react-router-dom';
import Axios from 'axios';
import './ResponseDetailsPage.css';

import { APIgetForms, APIgetResults } from '../services/APIassesmentService.js';
import { APIgetUsers } from '../services/APIuserService.js'
import { APIgetResultDetails } from '../services/APIassesmentService.js';

const ResponseDetailsPage  = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedAssessmentType, setSelectedAssessmentType] = useState('');
  const {event_id } = useParams();
  const [users, setUsers] = useState([]);
  const [assessmentTypes, setAssessmentTypes] = useState([]);
  const [formResponses, setFormResponses] = useState([]);
  const [resultDetails, setResultDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // console.log('event_id:', event_id)
  // console.log('resultDetails:', resultDetails)


    useEffect(() => {
      getForms();
      getUsersList();
    }, []);

    // @TODO not clear 
    // useEffect(() => {
    //   let url = 'http://localhost:5000/results';
    //   if (selectedEmployee) {
    //     url = `http://localhost:5000/results/${selectedEmployee}`;
    //   }
    
    //   fetch(url)
    //     .then((response) => response.json())
    //     .then((data) => setFormResponses(data))
    //     .catch((error) => console.error('Error:', error));
    
    // }, [selectedEmployee, users]);

    useEffect(() => {
      getResultDetails()
    },[resultDetails, event_id]);
    

    const getResultDetails = async() => {
      try {
        const eventID = event_id ? event_id : null;
        const data = await APIgetResultDetails(eventID);
        setResultDetails(data);
      } catch (err) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    const getForms = async () => {
      try{
        const data = await APIgetForms();
        setAssessmentTypes(data);
      } catch(error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    const getUsersList = async () => {
      try{
        const data = await APIgetUsers();
        setUsers(data);
      } catch(error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

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
      return {
        ...response,
        firstName: user?.firstname || '',
        lastName: user?.lastname || '',
        assessmentTitle: assessmentType?.title || ''
      };
    });
    
  return (
    <div className='result-details'>
      <div className='section-title'>Response Details Page</div>
      <hr />
      <div className="form-container d-flex reports-header mb-5">
        <div className='section-header mt-5 mb-3'>Response ID: {event_id}</div>
      </div>  
      <div>
        <div className='section-header'>Survey Results</div>
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>Field Title</th><th>Answer</th>
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
