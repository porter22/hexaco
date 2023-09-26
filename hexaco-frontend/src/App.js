import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserList from './pages/UserList';
import QuestionList from './pages/QuestionList';
import ResponseForm from './pages/ResponseForm';
import AddNewEmployee from './pages/AddNewEmployee';
import CreateGroupPage from './pages/CreateGroupPage';
import AssignAssessment from './pages/AssignAssessment';
import ResultsPage from './pages/ResultsPage';
import ResponseDetailsPage from './pages/ResponseDetailsPage'; // Import the new component

import TopBar from './components/TopBar'; // Adjust the path as per your folder structure
import './components/TopBar.css'; // Import the CSS

function App() {
  return (
    <Router>
      <TopBar /> {/* Add the TopBar component here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AddNewEmployee />} />
        <Route path="/create-group" element={<CreateGroupPage />} />
        <Route path="/assign-assessment" element={<AssignAssessment />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/questionlist" element={<QuestionList />} />
        <Route path="/responseform" element={<ResponseForm />} />
        {/* New route for ResponseDetailsPage */}
        <Route path="/response-details/:event_id" element={<ResponseDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
