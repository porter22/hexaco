import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AssignAssessment.css';

const AssignAssessment = () => {
  const [assessmentType, setAssessmentType] = useState('group');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedAssessment, setSelectedAssessment] = useState('');
  const [scheduleDate, setScheduleDate] = useState(null);
  const [scheduleTime, setScheduleTime] = useState(null);

  const handleAssessmentTypeChange = (e) => {
    setAssessmentType(e.target.value);
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handleAssessmentChange = (e) => {
    setSelectedAssessment(e.target.value);
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
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-column-left">
            <h2>Assessment Details</h2>
          <div className="form-row">
            <label htmlFor="assessmentType">Select Assessment Type:</label>
            <div>
              <input
                type="radio"
                id="groupAssessment"
                name="assessmentType"
                value="group"
                checked={assessmentType === 'group'}
                onChange={handleAssessmentTypeChange}
              />
              <label htmlFor="groupAssessment">Group Assessment</label>
            </div>
            <div>
              <input
                type="radio"
                id="individualAssessment"
                name="assessmentType"
                value="individual"
                checked={assessmentType === 'individual'}
                onChange={handleAssessmentTypeChange}
              />
              <label htmlFor="individualAssessment">Individual Assessment</label>
            </div>
          </div>
          {assessmentType === 'group' && (
            <div className="form-row">
              <label htmlFor="group">Select Group:</label>
              <select id="group" value={selectedGroup} onChange={handleGroupChange}>
                <option value="">Select a group</option>
                {/* Render options dynamically from available groups */}
              </select>
            </div>
          )}
          <div className="form-row">
            <label htmlFor="assessment">Select Assessment:</label>
            <select id="assessment" value={selectedAssessment} onChange={handleAssessmentChange}>
              <option value="">Select an assessment</option>
              {/* Render options dynamically from available assessments */}
            </select>
          </div>
          <button type="submit">Assign</button>
        </div>
        <div className="form-column-right">
          <div className="form-row">
            <label htmlFor="scheduleDate">Schedule Date:</label>
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
