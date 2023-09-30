import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <Link to="/login">Go to Login Page</Link>
    </div>
  );
};

export default HomePage;
