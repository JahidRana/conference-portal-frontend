import React, { useState } from 'react';
import Carousel from '../../Component/Home/Carousel/Carousel';
import SideBar from '../../Component/Shared/SideBar/SideBar';
import { useLoaderData } from 'react-router-dom';
import './homepage.css';
const HomePage = () => {
    const loadedInfo = useLoaderData();
  



    const [HomePageMassage, setHomePageMassage] = useState(loadedInfo.data[0]);
    
    return (
        <div className='my-5 bcolor'>
            <div>
                <Carousel />
            </div>
            <div className='container my-5'>
                <div className='row'>
                <div className='col-md-9' style={{ textAlign: 'justify', fontSize: '1.25rem' }}>
                        {
                        HomePageMassage ?
                        HomePageMassage.content
                            :
                            "Coming Soon"
                    }
   
                    </div>
                    <div className='col-md-3 border border-bottom-0 border-end-0 h-75 align-items-center p-0'>
                        <SideBar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;