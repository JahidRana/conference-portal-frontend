import React from 'react';
import Footer from '../Shared/Footer/Footer';
import { Outlet } from 'react-router-dom';
import items from '../../asset/FakeData/SideNavbarForReviewer.json';
import HomeNavBar from '../Shared/HomeNavBar/HomeNavBar';
import SideBarMain from '../Shared/SideNavbar/SideBarMain';
import './ReviewerOutlet.css'

const ReviewerOutlet = () => {
    return (
        <div>
            <div className="d-flex ">
                <HomeNavBar />
                <div className="sidebar">
                        {items.map((item, index) => <SideBarMain key={index} item={item} />)}
                </div>
                <div className='ReviewerMainComponent'>
                    <Outlet />
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default ReviewerOutlet;