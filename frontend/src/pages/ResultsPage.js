import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './ResultsPage.css';

const ResultsPage = () => {
  const [assessmentCategory, setAssessmentCategory] = useState('group');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedObserver, setSelectedObserver] = useState('');
  const [selectedAssessmentType, setSelectedAssessmentType] = useState('');
  const [scheduleDate, setScheduleDate] = useState(null);
  const [scheduleTime, setScheduleTime] = useState(null);

  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [assessmentTypes, setAssessmentTypes] = useState([]);
  const [formResponses, setFormResponses] = useState([]);

  const [reportText, setReportText] = useState("");


    useEffect(() => {
        fetch('http://localhost:5000/groups')
            .then(response => response.json())
            .then(data => setGroups(data))
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/forms')
            .then(response => response.json())
            .then(data => setAssessmentTypes(data))
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
    

    /*useEffect(() => {
        fetch('http://localhost:5000/users')
          .then(response => response.json())
          .then(data => setUsers(data))
          .catch(error => console.error('Error:', error));
        
      }, []);*/

      useEffect(() => {
        Axios.get('http://localhost:5000/users')
          .then(response => setUsers(response.data))
          .catch(error => console.error('Error:', error));
      }, []);
      
      const generateReport = async () => {
        const url = 'http://localhost:5000/generate-report/${selectedEmployee}/${selectedAssessmentType}';
    
        try {
          const response = await fetch(url, {
            method: 'GET',
          });
    
          const data = await response.json();
          console.log(data)

          setReportText(data.report);
          // Handle the response data or update your React state here...
    
        } catch (error) {
          console.error("There was an error generating the report:", error);
        }
      }
      

  const handleAssessmentTypeChange = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue)
    setSelectedAssessmentType(e.target.value);
  };
  
  const handleAssessmentCategoryChange = (e) => {
    setAssessmentCategory(e.target.value);
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handleEmployeeChange = (e) => {
    const selectedValue = e.target.value;
  
    // Update the selectedEmployee state
    setSelectedEmployee(selectedValue);
  };

  const handleObserverChange = (e) => {
    setSelectedObserver(e.target.value);
  };

  const handleDateChange = (date) => {
    setScheduleDate(date);
  };

  const handleTimeChange = (time) => {
    setScheduleTime(time);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

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
      console.log(response)
      return {
        ...response,
        firstName: user?.firstname || '',
        lastName: user?.lastname || '',
        assessmentTitle: assessmentType?.title || ''
      };
    });
    
  return (
    <div class="form-block">
        <form id="email-form" name="email-form" class="form">
            <div class="div-block">
                    <div className="form-row">
                        <label htmlFor="employee">Select Employee:</label>
                        <select id="employee" value={selectedEmployee} onChange={handleEmployeeChange}>
                        <option value="">Select Employee</option>
                        {users.filter(user => user.role === 'pemployee').map(user => (
                            <option key={user.id} value={user.id}>{user.username}</option>
                        ))}
                    </select>
                    </div>


                <div className="form-row">
                    <label htmlFor="assessmentType">Select Assessment:</label>
                    <select id="assessmentType" value={selectedAssessmentType} onChange={handleAssessmentTypeChange}>
                    <option value="">Select an assessment</option>
                    {
                        // Render options dynamically from available assessments
                        assessmentTypes.map(assessmentType => (
                            <option key={assessmentType.id} value={assessmentType.id}>
                                {assessmentType.title}
                            </option>
                        ))
                    }
                    </select>
                </div>
                
                <button type="button" onClick={generateReport}>Generate Report</button>
            </div>

            <div className="div-block">
              {/* Display the filtered form responses */}
              <table className="form-responses">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>User ID</th>
                    <th>Form ID</th>
                    <th>Form Title</th>
                    <th>Submitted At</th>
                    <th>Response ID</th>
                    {/* Add other fields as needed */}
                  </tr>
                </thead>
                <tbody>
                  {filteredFormResponses.map((response) => (
                    <tr key={response.event_id} className="form-response">
                      <td>{response.firstName}</td>
                      <td>{response.lastName}</td>
                      <td>{response.user_id}</td>
                      <td>{response.form_id}</td>
                      <td>{response.assessmentTitle}</td>
                      <td>{response.submitted_at}</td>
                      <td>{response.event_id}</td>
                      <td>
                        {/* New Details link */}
                        <Link to={`/response-details/${response.event_id}`}>Details</Link>
                      </td>
                      
                      {/* Add other fields as needed */}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="report-section">
                <h2>Generated Report:</h2>
                <p>{reportText}</p>
              </div>
              
            </div>

    
  </form>
</div>

  );
};

export default ResultsPage;
