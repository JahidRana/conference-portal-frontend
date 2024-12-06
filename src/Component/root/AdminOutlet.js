import React from 'react';
import Footer from '../Shared/Footer/Footer';
import { Outlet } from 'react-router-dom';
import SideNavbar from '../Shared/SideNavbar/SideNavbar';
import HomeNavBar from '../Shared/HomeNavBar/HomeNavBar';
import './AdminOutlet.css'

const AdminOutlet = () => {
    return (
        <div>
            <div className="">
                <HomeNavBar />
                <div className='d-flex'>
                    <div className="Admin-SideBar">
                        <SideNavbar></SideNavbar>
                    </div>
                    <div className="AdminComponent">
                        <Outlet />
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default AdminOutlet;