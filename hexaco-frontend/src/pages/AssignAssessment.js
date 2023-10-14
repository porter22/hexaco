import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import {APIcreateAssesment, APIgetForms} from '../services/APIassesmentService.js';
import {APIgetGroups} from '../services/APIgroupService.js';
import {APIgetUsers} from '../services/APIuserService.js';
import 'react-datepicker/dist/react-datepicker.css';
import './AssignAssessment.scss';

import Checkbox from '../components/Checkbox/Checkbox.js';
import DropdownSelect from '../components/Dropdown/DropdownSelect.js';
import CommonButton from '../components/Buttons/CommonButton/CommonButton.js';
import RadioButton from '../components/RadioButton/RadioButton.js';

const AssignAssessment = () => {
  const [assessmentCategory, setAssessmentCategory] = useState('group');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedObserver, setSelectedObserver] = useState('');
  const [isNotify, setNotification] = useState('');
  const [selectedAssessmentType, setSelectedAssessmentType] = useState('');
  const [scheduleDate, setScheduleDate] = useState(null);
  const [scheduleTime, setScheduleTime] = useState(null);
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [assessmentTypes, setAssessmentTypes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCreateAssign, setIsLoadingCreateAssign] = useState(false);


  useEffect(() => {
      getUsers();
      getUserGroups();
      getForms();
  }, []);

  const handleScheduledAssessment = async() => {
    try{
      setIsLoadingCreateAssign(true)
      const scheduledAssessmentData = {
        selectedEmployee: selectedEmployee,
        //user_ids: addedUsers.map((user) => user.id),
        selectedGroup: selectedGroup,
        selectedObserver: selectedObserver,
        isNotify: setNotification,
        selectedAssessmentType: selectedAssessmentType, //assessment_id
        selectedAssessmentCategory: assessmentCategory, //Individual or group
        scheduleDate: scheduleDate,
        scheduleTime: scheduleTime
      };
      const data = await APIcreateAssesment(scheduledAssessmentData);
      console.log('Assessment scheduled:', data);
    }catch(error){
      console.error(error);
    }finally{
      setIsLoadingCreateAssign(false)
    }
  }

  const getUsers = async () => {
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

  const getUserGroups = async() => {
    try{
      const data = await APIgetGroups();
      setGroups(data);
    } catch(error) {
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

  const handleAssessmentTypeChange = (selected) => {
    setSelectedAssessmentType(selected);
  };
  
  const handleAssessmentCategoryChange = (e) => {
    setAssessmentCategory(e.target.value);
  };

  const handleGroupChange = (obj) => {
    setSelectedGroup(obj);
  };

  const handleEmployeeChange = (selectedUser) => {
    setSelectedEmployee(selectedUser);
  };

  const handleObserverChange = (selectedObserver) => {
    setSelectedObserver(selectedObserver);
  };
  const handleConfirmationChange = (value) => {
    setNotification(value);
  }

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
  const formattedGroups = groups.map(group => ({
      id: group.id,
      value: group.id,
      text: group.name
    }));
  const formattedAssessmentTypes = assessmentTypes.map(assessment => ({
      id: assessment.id,
      value: assessment.id,
      text: assessment.title
    }));
  const formattedUsers = users.filter(user => user.role === 'pemployee').map(user => ({
    id: user.id,
    value: user.id,
    text: user.username
  }));
  const formattedUsersName = users.filter(user => user.role === 'pemployee').map(user => ({
    id: user.id,
    value: user.id,
    text: `${user.firstname} ${user.lastname}`
  }));

  return (
    <div className="assesment-details">
      <div className='section-title'>Assign Assessment</div>
      <hr />
      <div className="form-container d-flex">
        <div className="col-1-2 mr-4 assessment-details-column">
        <div className='section-header mt-5 mb-3'>Assessment Details</div>
        <div className='mb-5'>
          <RadioButton
            id="groupAssessment"
            name="assessmentCategory"
            value="group"
            label="Group Assessment"
            checked={assessmentCategory === 'group'}
            className="mr-1"
            onChange={handleAssessmentCategoryChange}
          />
        <RadioButton
            id="individualAssessment"
            name="assessmentCategory"
            value="individual"
            label="Individual Assessment"
            checked={assessmentCategory === 'individual'}
            className="mr-1"
            onChange={handleAssessmentCategoryChange}
          />
        </div>
            {assessmentCategory === 'group' && (
              <DropdownSelect 
                  id="group"
                  labelText="Select Group:"
                  options={formattedGroups}
                  onSelect={handleGroupChange}
                >
                </DropdownSelect>
            )}
            {assessmentCategory === 'individual' && (
                <DropdownSelect 
                  id="employee"
                  labelText="Select Employee:"
                  options={formattedUsers}
                  onSelect={handleEmployeeChange}
                />
            )}
            <div className="form-row mb-5">
              <DropdownSelect 
                id="assessmentType"
                labelText="Select Assessment:"
                options={formattedAssessmentTypes}
                onSelect={handleAssessmentTypeChange}
              />
            </div>
            <Checkbox id="isEmailConf"
              name="isNotificationActive"
              label="Send email-confirmation"
              className="mr-1"
              onChange={handleConfirmationChange}>
            </Checkbox>
            <div className='d-flex justify-space-between mt-4'>
              <div className='group-details-actions'>
              {isLoadingCreateAssign ? (
                  <div className="loader">Loading...</div>
                ) : (
                  <CommonButton onClick={handleScheduledAssessment} classes="btn-prim mr-3">Assign</CommonButton>
                )}
              </div>
              <div className='employee-details-import'></div>
            </div>
        </div>
        {assessmentCategory === 'individual' && (
          <div className="col-1-2 mr-4 assessment-details-column">
            <DropdownSelect 
                id="observer"
                labelText="Select Assessors:"
                options={formattedUsersName}
                onSelect={handleObserverChange}
              />
          </div>
        )}
        <div className="col-1-2 mr-4 assessment-details-column">
          <div className="w-layout-blockcontainer container">
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
        </div>
      </div>
    </div>
  );
};

export default AssignAssessment;
