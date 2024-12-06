import React, { useContext } from 'react';
import HomeNavBar from '../Shared/HomeNavBar/HomeNavBar';
import {  Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import items from '../../asset/FakeData/SideNavbarForAuthor.json';
import SideBarMain from '../Shared/SideNavbar/SideBarMain';
import './AuthorOutlet.css';

const AuthorOutlet = () => {
    const { reviewer } = useContext(AuthContext);
    return (
        <div>
            <div className="">
                <HomeNavBar />
                <div className="">
                    <div className="AuthorSidebar">
                        {items.map((item, index) => (
                            <SideBarMain key={index} item={item} />
                        ))}
                        
                        {/* Show Review Button */}
                        {/* <div className="px-2 d-flex align-items-center">
                            <i className='bi bi-file-earmark-check'></i>
                            <span className="m-0 p-2">
                                <Link to='/author/show-review' className='sidebar-item plain'>Show Review</Link>
                            </span>
                        </div> */}

                        {/* Reviewer Button */}
                        {/* {reviewer?.length ? '' : (
                            <div className="px-2 d-flex align-items-center">
                                <i className='bi bi-person-dash'></i>
                                <span className="m-0 p-2">
                                    <Link to='/author/reviewer-qualification' className='sidebar-item plain'>Be Reviewer</Link>
                                </span>
                            </div> */}
                        {/* )} */}
                    </div>
                </div>
                
                <div className="ReviewerMainComponent">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AuthorOutlet;
