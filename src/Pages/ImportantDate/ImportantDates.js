import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import './ImportantDates.css';

const ImportantDates = () => {
    const loadedInfo = useLoaderData();
    const [Dates, setDates] = useState(loadedInfo.data[0]);


    return (
        <div className='date'>
            <h4 className='text-center'> Important Dates </h4>
            <div className='row justify-content-around mb-5 text-center'>
                
                <div className='col-md-2 mb-2'>
                    <time className="date-as-calendar inline-flex size3x">
                        <span className="day">{Dates.PaperSubmissionDeadline}</span>
                        <span className="month">Paper Submission Deadline</span>
                    </time>
                </div>
                
                <div className='col-md-2 mb-2'>
                    <time className="date-as-calendar inline-flex size3x">
                        <span className="day">{Dates.AcceptanceNotification}</span>
                        <span className="month">Acceptance Notification</span>
                    </time>
                </div>
        
                <div className='col-md-2 mb-2'>
                    <time className="date-as-calendar inline-flex size3x">
                        <span className="day">{Dates.RegistrationDeadline}</span>
                        <span className="month">Registration Deadline Date</span>
                    </time>
                </div>

                <div className='col-md-2 mb-2'>
                    <time className="date-as-calendar inline-flex size3x conference-dates" >
                        <span className="day">{Dates.ConferenceStartDate} to {Dates.ConferenceEndDate}</span>
                        <span className="month">Dates of Conference</span>
                    </time>
                </div>

                <p style={{marginBottom: "40vh"}}></p>
            </div>
        </div>
    );
};

export default ImportantDates;
