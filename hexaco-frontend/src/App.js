import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routePaths, routeComponents } from './utils/routePaths.js'; 



import MainSidebar from './components/layouts/navigation/MainSidebar/MainSidebar.js';

function App() {
  return (
    <div id="wrapper">
      <Router>
        <MainSidebar />
        <div id='content'>
          <Routes>
            {Object.entries(routePaths).map(([key, path]) => (
              <Route key={key} path={path} element={React.createElement(routeComponents[key])} />
            ))}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
