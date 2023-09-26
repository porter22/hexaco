import React, { useState, useEffect } from 'react';
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
          .then(response => response.json())
          .then(data => setUsers(data))
          .catch(error => console.error('Error:', error));
      }, []);
      

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

                 {/* Display the filtered form responses */}
                 <div className="form-responses">
                  {filteredFormResponses.map((response) => (
                    <div key={response.id} className="form-response">
                      <p>Form ID: {response.form_id}</p>
                      <p>Submitted At: {response.submitted_at}</p>
                      <p>User_id: {response.user_id}</p>
                      <p>
                        User: {users.find((user) => user.id === response.user_id)?.firstname}{' '}
                        {users.find((user) => user.id === response.user_id)?.lastname}
                      </p>
                      {/* Add other fields as needed */}
                    </div>
                  ))}
                </div>

                <button type="submit">Generate Report</button>
            </div>

    
  </form>
</div>

  );
};

export default ResultsPage;
