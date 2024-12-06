import React from 'react';
import { useNavigate } from 'react-router-dom';
import './thankyou.css';

const ThankYou = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/'); // Redirect to the homepage or another page
  };

  return (
    <div className="thank-you-container">
      <h1>Thank You for Signing Up!</h1>
      <p>Your account has been successfully created.</p>
      <button onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
};

export default ThankYou;
