import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';
import { FaUser } from 'react-icons/fa';
import { MdOutlineRateReview } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';
import { FaUserShield } from 'react-icons/fa';
import { HiOutlineHome } from 'react-icons/hi';
import { ImPhone } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const navigate = useNavigate(); // Use useNavigate hook for navigation

    const handleSignUpClick = () => {
        navigate('/sign-up'); // Navigate to the signup page
    };
    const handleSignInClick=() => {
        navigate('/login'); // Navigate to the signin page
    };
    
    return (
        <div>
            <div className='homeSidebar'>
                <nav className="overflow-auto forRightScroll">
                    <div className='text-center my-5'>
                        <button type="button" className="btn btn-outline-primary mx-2" onClick={handleSignInClick}>Log In</button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary mx-2"
                            onClick={handleSignUpClick}
                        >
                            Sign Up
                        </button>
                    </div>
                    <h6>
                        <Link to='/' className="text-dark"><HiOutlineHome /> Home Page</Link>
                    </h6>
                    {/* <h6>
                      <Link to='/author' className="my-4 text-dark"><FaUser /> Author LogIn</Link>
                    </h6> */}
                    {/* <h6>
                        <Link to='/reviewer/dashboard' className="mb-4 text-dark"><MdOutlineRateReview /> Reviewer LogIn</Link>
                    </h6> */}
                    {/* <h6>
                        <Link to='/admin/dashboard' className="mb-4 text-dark"><FaUserShield /> Admin LogIn</Link>
                    </h6> */}
                    {/* <h6>
                        <Link to='/tract-chair' className="text-dark"><RiAdminFill /> Track Chair</Link>
                    </h6> */}
                    <h6>
                        <Link to='/' className="text-dark"><ImPhone /> Support</Link>
                    </h6>
                    <hr className='m-0' />
                </nav>
            </div>
        </div>
    );
};

export default SideBar;
