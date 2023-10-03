import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/login">Go to Login Page</Link>
    </div>
  );
};

export default HomePage;