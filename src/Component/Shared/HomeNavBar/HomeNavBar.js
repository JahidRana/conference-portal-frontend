import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import { HamburgMenuClose, HamburgMenuOpen } from './Icon';
import './HomeNavBar.css';

const HomeNavBar = () => {
    const [dashboardURL, setDashboardURL] = useState('/');
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Check for token in localStorage 
    
    const location = useLocation();
    useEffect(() => {
        if (token) {
            axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/sign-in/signin/getdashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setDashboardURL(response.data.dashboardURL);
            })
            .catch(error => {
                console.error('Error fetching the dashboard URL:', error);
            });
        }
    }, [token]);
    const handleLogout = () => {
        // Clear the token and email from localStorage on logout

        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        navigate('/login');
    };
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    // Check if the current path matches one of the submission submenu paths
    const isSubmissionActive = location.pathname === '/submission-guideline' || location.pathname === '/submission-track';

    return (
        <div className='NavContainer'>
            <nav className="navbar">
                <div className="nav-container">
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to='/committee'
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Committees
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to='/dates'
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Dates
                            </NavLink>
                        </li>
                        <li className={`nav-item ${isSubmissionActive ? 'active' : ''}`}>
                            {/* Non-clickable Submission menu */}
                            <span className="nav-links">
                                Submission
                            </span>
                            {/* Submenu */}
                            <ul className="dropdown-menu">
                                <li className="dropdown-item">
                                    <NavLink
                                        exact
                                        to='/accepted-paper'
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleClick}
                                    >
                                        Accepted Abstract
                                    </NavLink>
                                </li>
                                <li className="dropdown-item">
                                    <NavLink
                                        exact
                                        to='/submission-guideline'
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleClick}
                                    >
                                        Submission Guideline
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to='/registration'
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Registration
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to='/schedules'
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Program
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to='/speakers'
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Speakers
                            </NavLink>
                        </li>
                        <li className={`nav-item ${isSubmissionActive ? 'active' : ''}`}>
                            {/* Non-clickable Submission menu */}
                            <span className="nav-links">
                            Venue
                            </span>
                            {/* Submenu */}
                            <ul className="dropdown-menu">
                            <li className="dropdown-item">
                                    <NavLink
                                        exact
                                        to='/venu-details'
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleClick}
                                    >
                                        Venue Details
                                    </NavLink>
                                </li>
                                <li className="dropdown-item">
                                    <NavLink
                                        exact
                                        to='/venue-accomodations'
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleClick}
                                    >
                                        Accomodations
                                    </NavLink>
                                </li>
                                <li className="dropdown-item">
                                    <NavLink
                                        exact
                                        to='/tourist-place'
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleClick}
                                    >
                                        Tourist Places
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-links" to='/contact'>Contact</NavLink>
                        </li>

                        <li className="nav-item">
                            {token ? (
                                <>
                                    <NavLink className="nav-links" to={dashboardURL}>Dashboard</NavLink>
                                    <NavLink onClick={handleLogout} className="nav-links" to='/login'>Logout</NavLink>
                                </>
                            ) : (
                                <NavLink className="nav-links" to='/login'>Login</NavLink>
                            )}
                        </li>
                        
                    </ul>
                    <div className="nav-icon" onClick={handleClick}>
                        {click ? (
                            <span className="icon">
                                <HamburgMenuClose />
                            </span>
                        ) : (
                            <span className="icon">
                                <HamburgMenuOpen />
                            </span>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default HomeNavBar;
