import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { APIgetUsers } from '../services/APIuserService.js'
import {APIgetGroups} from '../services/APIgroupService.js';
import { APIgetForms, APIgetResults, APIgenerateReport } from '../services/APIassesmentService.js';
import DropdownSelect from '../components/Dropdown/DropdownSelect.js';
import CommonButton from '../components/Buttons/CommonButton/CommonButton.js';
import Table from '../components/TableList/TableList.js';
import './ResultsPage.scss';

const ResultsPage = () => {
  const [assessmentCategory, setAssessmentCategory] = useState('group');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedObserver, setSelectedObserver] = useState('');
  const [selectedAssessmentType, setSelectedAssessmentType] = useState('');
  const [scheduleDate, setScheduleDate] = useState(null);
  const [scheduleTime, setScheduleTime] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [assessmentTypes, setAssessmentTypes] = useState([]);
  const [formResponses, setFormResponses] = useState([]);

  const [reportText, setReportText] = useState("");
  const [isTableVisible, setIsTableVisible] = useState(true);

  useEffect(() => {
    getUsersList();
    getGroupsList();
    getForms();
    getResults();
  }, []);


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

  const getGroupsList = async() => {
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

  const getResults = async () => {
    try{
      // let employeeId = selectedEmployee ? selectedEmployee : 0;
      const data = await APIgetResults();
      setFormResponses(data);
    } catch(error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const generateReport = async () => {
    try {
      const data = await APIgenerateReport(selectedEmployee.value, selectedAssessmentType.value)
      setReportText(data.report);

    } catch (error) {
      console.error("There was an error generating the report:", error);
    }
  }
  function formatReportText() {
    const paragraphs = reportText.split(/\d+\./).filter(Boolean);
  
    return paragraphs.map((paragraph, index) => (
      <p key={index}>{paragraph.trim()}</p>
    ));

  }
  const formattedUsers = users.filter(user => user.role === 'pemployee').map(user => ({
    id: user.id,
    value: user.id,
    text: user.username
  }));

  const formattedAssessmentTypes = assessmentTypes.map(assessment => ({
    id: assessment.id,
    value: assessment.id,
    text: assessment.title
  }));

  const handleAssessmentTypeChange = (selectedValue) => {
    setSelectedAssessmentType(selectedValue);
  };
  
  const handleAssessmentCategoryChange = (e) => {
    setAssessmentCategory(e.target.value);
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handleEmployeeChange = (value) => {
    setSelectedEmployee(value);
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
  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };
  const columns = [
    {firstName: "First name"}, 
    {lastName: "Last name"},
    {assessmentTitle: "Form title"},
    {submitted_at: "Submitted At"},
    {link: "Details"}
  ];

  const filteredFormResponses = formResponses.filter((response) => {
    // @COMMENT if need relation with selected employee
    // if (selectedEmployee && response.user_id !== parseInt(selectedEmployee)) {
    //   return false;
    // }
    // if (selectedAssessmentType && response.form_id !== selectedAssessmentType) {
    //   return false;
    // }
    return true;
  }).map((response) => {
    const user = users.find((user) => user.id === response.user_id);
    const assessmentType = assessmentTypes.find((type) => type.id === response.form_id);
    const detailURL = `/response-details/${response.event_id}`;
    return {
      ...response,
      firstName: user?.firstname || '',
      lastName: user?.lastname || '',
      assessmentTitle: assessmentType?.title || '',
      link: (
        <Link to={detailURL}>Link</Link>
      ),
    };
  });
    
  return (
    <div className='result-details'>
      <div className='section-title'>Reports</div>
      <hr />
      <div className="form-container d-flex reports-header mb-5">
        <DropdownSelect 
            id="employee"
            labelText="Select Employee:"
            options={formattedUsers}
            onSelect={handleEmployeeChange}
            className="mr-4"
          >
          </DropdownSelect>
          <DropdownSelect 
            id="assessmentType"
            labelText="Select Assessment:"
            options={formattedAssessmentTypes}
            onSelect={handleAssessmentTypeChange}
            className="mr-4"
          >
          </DropdownSelect>
          <CommonButton onClick={generateReport}
            disabled={
              (!selectedEmployee || !selectedAssessmentType)
            }
            classes="btn-action mr-3">
              Generate Report
          </CommonButton>
        </div>
      <div className="reports-wrapper">
        <span onClick={toggleTableVisibility} style={{ cursor: 'pointer', marginLeft: '10px' }}>
          {isTableVisible ? 'Collapse Table' : 'Expand Table'}
        </span>
        {isTableVisible && (
          <div>
            <Table columns={columns} data={filteredFormResponses} className="mt-5">
            </Table>
          </div>
           )}
          <div className="report-section">
            <h2>Generated Report:</h2>
            <p>{formatReportText()}</p>
          </div>
      </div>
    </div>
  );
};

export default ResultsPage;