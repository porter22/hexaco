import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AssignAssessment.css';

const AssignAssessment = () => {
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
        fetch('http://localhost:5000/users')
          .then(response => response.json())
          .then(data => setUsers(data))
          .catch(error => console.error('Error:', error));
      }, []);

      const handleScheduledAssessment = () => {
        const scheduledAssessmentData = {
          selectedEmployee: selectedEmployee,
          //user_ids: addedUsers.map((user) => user.id),
          selectedGroup: selectedGroup,
          selectedObserver: selectedObserver,
          selectedAssessmentType: selectedAssessmentType, //assessment_id
          selectedAssessmentCategory: assessmentCategory, //Individual or group
          scheduleDate: scheduleDate,
          scheduleTime: scheduleTime
        };
      
        fetch('http://localhost:5000/schedule-assessment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(scheduledAssessmentData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to create group');
            }
            return response.json();
          })
          .then((data) => {
            console.log('Assessment scheduled:', data);
            // Handle any success actions here
          })
          .catch((error) => {
            console.error(error);
            // Handle any error actions here
          });
      };

  const handleAssessmentTypeChange = (e) => {
    setSelectedAssessmentType(e.target.value);
  };
  
  const handleAssessmentCategoryChange = (e) => {
    setAssessmentCategory(e.target.value);
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
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

  return (
    <div class="form-block">
        <form id="email-form" name="email-form" class="form">
            <div class="div-block">
            
                <h2>Assessment Details</h2>

                <div className="radio-container">
                    <input
                        type="radio"
                        id="individualAssessment"
                        name="assessmentCategory"
                        value="individual"
                        class="w-form-formradioinput"
                        checked={assessmentCategory === 'individual'}
                        onChange={handleAssessmentCategoryChange}
                    />
                    <label htmlFor="individualAssessment">Individual Assessment</label>
                </div>

                <div className="radio-container">
                    <input
                        type="radio"
                        id="groupAssessment"
                        name="assessmentCategory"
                        value="group"
                        class="w-form-formradioinput"
                        checked={assessmentCategory === 'group'}
                        onChange={handleAssessmentCategoryChange}
                    />
                    <label htmlFor="groupAssessment">Group Assessment</label>
                </div>

               

                {assessmentCategory === 'group' && (
                    <div className="form-row">
                        <label htmlFor="group">Select Group:</label>
                        <select id="group" value={selectedGroup} onChange={handleGroupChange}>
                            <option value="">Select a group</option>
                            {groups.map(group => (
                                <option key={group.id} value={group.id}>{group.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                {assessmentCategory === 'individual' && (
                    <div className="form-row">
                        <label htmlFor="employee">Select Employee:</label>
                        <select id="employee" value={selectedEmployee} onChange={handleEmployeeChange}>
                        <option value="">Select Employee</option>
                        {users.filter(user => user.role === 'pemployee').map(user => (
                            <option key={user.id} value={user.id}>{user.username}</option>
                        ))}
                    </select>
                    </div>
                )}

                {assessmentCategory === 'individual' && (
                    <div className="form-row">
                        <label htmlFor="observer">Select Observer:</label>
                        <select id="observer" value={selectedObserver} onChange={handleObserverChange}>
                        <option value="">Select Observer</option>
                        {users.filter(user => user.role === 'pemployee').map(user => (
                            <option key={user.id} value={user.id}>{user.username}</option>
                        ))}
                    </select>
                    </div>
                )}

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
                <button type="button" onClick={handleScheduledAssessment}>Assign</button>
            </div>

    <div class="w-layout-blockcontainer container">
        <div className="form-row">
            <label htmlFor="scheduleDate" >Schedule Date:</label>
            <DatePicker
              id="scheduleDate"
              selected={scheduleDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
            />
        </div>
        <div className="form-row">
            <label htmlFor="scheduleTime">Schedule Time:</label>
            <DatePicker
              id="scheduleTime"
              selected={scheduleTime}
              onChange={handleTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              placeholderText="Select a time"
            />
        </div>
    </div>
  </form>
</div>

  );
};

export default AssignAssessment;
