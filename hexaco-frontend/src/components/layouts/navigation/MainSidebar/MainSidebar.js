import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faNoteSticky, faUsers, faUserPlus, faArrowRightFromBracket, faChartPie, faClipboardQuestion, faClipboard } from '@fortawesome/free-solid-svg-icons';
import './MainSidebar.scss'


const links = [
    { to: '/', text: 'Dashboard', icon: faHouse },
    { to: '/login', text: 'Login',  icon: faArrowRightFromBracket },
    { to: '/userlist', text: 'Employees',  icon: faUsers },
    { to: '/assign-assessment', text: 'Assessments', icon: faNoteSticky },
    { to: '/admin', text: 'Add Employee',  icon: faUser },
    { to: '/create-group', text: 'Create Group', icon: faUserPlus },
    { to: '/results', text: 'Analytics',  icon: faChartPie},
    // { to: '/questionlist', text: 'Question List',  icon: faClipboardQuestion  },
    // { to: '/responseform', text: 'Response Form',  icon: faClipboard  },
    // Добавьте другие ссылки при необходимости
  ];


  function MainSidebar({ onSidebarValue }) {
    const [isSidebarExpanded, setSidebarExpanded] = useState(true);
    const [isSidebarFixed, setSidebarFixed] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const isLoggedIn = localStorage.getItem('token'); // Проверяем наличие токена в localStorage

    const toggleSidebar = () => {
        setSidebarExpanded(!isSidebarExpanded);
        setSidebarWidth(isSidebarExpanded ? 75 : 250);
        onSidebarValue(sidebarWidth);
    };
    const fixSidebar = () => {
        setSidebarFixed(!isSidebarFixed);
    };

    // Отфильтровать ссылку "Login" на основе наличия токена
    const filteredLinks = links.filter((link) => {
        return !(link.to === '/login' && isLoggedIn); // Скрыть ссылку "Login" при наличии токена
    });

    return (
        <div id='sidebar__mn' className={`sidebar__mna ${isSidebarFixed ? 'fixed' : ''}`} style={{ width: sidebarWidth }}>
            <nav className={`sidebar__mn ${isSidebarExpanded ? '' : 'collapsed'}`}>
                <div className='sidebar__mn-header'>
                    <div className='sidebar__mn-logo'></div>
                    <div className='sidebar__mn-swicher' onClick={toggleSidebar}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className='sidebar__mn-content'>
                    <ul className='list'>
                        {filteredLinks.map((link, index) => (
                            <li className='sidebar__list-item d-flex align-center' key={index}>
                                <div className='list--title'>
                                    {link.icon && (<FontAwesomeIcon icon={link.icon} />)}
                                    <div className='list--title__content'>
                                        <Link to={link.to}>{link.text}</Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='sidebar__mn-footer'></div>
            </nav>
        </div>
    );
}

export default MainSidebar;
