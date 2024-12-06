import React from 'react';
import { Outlet } from 'react-router-dom';
import HomeNavBar from '../Shared/HomeNavBar/HomeNavBar';
import Footer from '../Shared/Footer/Footer';
          


const AppRouter = () => {
    return (

        <div>
            <HomeNavBar />
            <Outlet />
            <Footer />
        </div>

    );
};

export default AppRouter;