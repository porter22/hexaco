import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routePaths, routeComponents } from './utils/routePaths.js'; 



import MainSidebar from './components/layouts/navigation/MainSidebar/MainSidebar.js';

function App() {
  const [sidebarValue, setSidebarValue] = useState(null);

  const handleSidebarValue = (value) => {
    setSidebarValue(value);
  };

  return (
    <div id="wrapper">
      <Router>
        <MainSidebar onSidebarValue={handleSidebarValue}/>
        <div id='content'>
          <div className='content--block'>
            <Routes>
              {Object.entries(routePaths).map(([key, path]) => (
                <Route key={key} path={path} element={React.createElement(routeComponents[key])} />
              ))}
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
