import React from 'react';
import './TopBanner.css'
import Logo from '../../../asset/images/logo.png'
const TopBanner = () => {
    return (

        <div className='mx-4'>
            <div className='home-container'>

                <div>
                    <img className='logo ms-5' src={Logo} alt="logo" />
                </div>
                <div className='hederBackground'> </div>
                <div className='homeoverlay'>
                    <div className='home-content text-center'>
                        <h1>International Conference on Emerging Technologies for Sustainable Development</h1>
                        <div className='text-end p-5'>
                            <h6 className='text-mute'>Venue: Jashore, Bangladesh</h6>
                            <h4 className='text-danger'>Date: 23 September,2023</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBanner;