import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routePaths, routeComponents } from './utils/routePaths.js'; 

import TopBar from './components/TopBar'; // Adjust the path as per your folder structure
import './components/TopBar.css'; // Import the CSS

function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        {Object.entries(routePaths).map(([key, path]) => (
          <Route key={key} path={path} element={React.createElement(routeComponents[key])} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
