import React, { useState, useEffect } from 'react';
import './AuthorHome.css';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AuthorHome = () => {
  const [date, setDate] = useState(null);
  const [error, setError] = useState(null);

  // Fetch data dynamically from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/get-date`
        );
        setDate(response.data);
      } catch (error) {
        console.error('Error fetching date data', error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error loading data!</div>;
  }

  if (!date) {
    return <div>Loading...</div>;
  }

  return (
    <div className='text-center'>
      <section className='my-2'>
        <h3 className='text-center text-bg-danger mx-5'>
          <IoIosArrowBack />
          <IoIosArrowBack />
          Important Dates
          <MdOutlineArrowForwardIos />
          <MdOutlineArrowForwardIos />
        </h3>
        <div className='text-center my-5'>
          <h6>
            <strong>Paper Submission Deadline : </strong>
            <strong className='text-primary'>
              {date.data[0].PaperSubmissionDeadline}
            </strong>
          </h6>
          <h6>
            <strong>Acceptance Notification : </strong>
            <strong className='text-danger'>
              {date.data[0].AcceptanceNotification}
            </strong>
          </h6>
          <h6>
            <strong>Camera Ready Submission : </strong>
            <strong className='text-info'>
              {date.data[0].CameraReadySubmission}
            </strong>
          </h6>
          <h6>
            <strong>Registration Deadline : </strong>
            <strong className='text-success'>
              {date.data[0].RegistrationDeadline}
            </strong>
          </h6>
          {/* Dynamic Call For Paper Button */}
          <button
            type='button'
            className='btn btn-outline-info my-5'
            onClick={() =>
              window.open(
                'https://asset.cloudinary.com/dlpsf2ilp/348cda2ffb63295f788e26cba79f4873',
                '_blank'
              )
            }
          >
            Call For Paper
          </button>
        </div>
      </section>
    </div>
  );
};

export default AuthorHome;
