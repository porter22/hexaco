import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import './MainSidebar.scss'


const links = [
    { to: '/', text: 'Home', icon: faHouse },
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


function MainSidebar() {
    return (
        <div id='sidebar__mn'>
            <nav className='sidebar__mn'>
                <div className='sidebar__mn-header'>
                    <div className='sidebar__mn-logo'></div>
                    <div className='sidebar__mn-swicher'>
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
