import React from 'react';
import { Link } from 'react-router-dom';

function TopBar() {
    return (
        <nav className="top-bar">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/admin">Add Employee</Link>
            <Link to="/create-group">Create Group</Link>
            <Link to="/assign-assessment">Assign Assessment</Link>
            <Link to="/results">Results</Link>
            <Link to="/userlist">User List</Link>
            <Link to="/questionlist">Question List</Link>
            <Link to="/responseform">Response Form</Link>
            {/* ... add other links as needed */}
        </nav>
    );
}

export default TopBar;
