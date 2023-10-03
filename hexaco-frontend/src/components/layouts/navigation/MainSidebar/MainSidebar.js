import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import './MainSidebar.scss'


const links = [
    { to: '/', text: 'Dashboard', icon: faHouse },
    { to: '/login', text: 'Login',  icon: '' },
    { to: '/admin', text: 'Add Employee',  icon: faUser },
    { to: '/create-group', text: 'Create Group', icon: '' },
    { to: '/assign-assessment', text: 'Assign Assessment', icon: faNoteSticky },
    { to: '/results', text: 'Results',  icon: ''  },
    { to: '/userlist', text: 'User List',  icon: ''  },
    { to: '/questionlist', text: 'Question List',  icon: ''  },
    { to: '/responseform', text: 'Response Form',  icon: ''  },
    // Добавьте другие ссылки при необходимости
  ];


function MainSidebar({ onSidebarValue }) {
    const [isSidebarExpanded, setSidebarExpanded] = useState(true);
    const [isSidebarFixed, setSidebarFixed] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(250);

    const toggleSidebar = () => {
        setSidebarExpanded(!isSidebarExpanded);
        setSidebarWidth(isSidebarExpanded ? 75 : 250);
        onSidebarValue(sidebarWidth);
    };
    const fixSidebar = () => {
        setSidebarFixed(!isSidebarFixed);
    };

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
                    {links.map((link, index) => (
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
