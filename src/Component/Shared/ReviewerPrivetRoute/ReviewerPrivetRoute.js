// ReviewerPrivetRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ReviewerPrivetRoute = ({ children }) => {
    const userRole = localStorage.getItem('role');

    // Ensure the user is a reviewer
    if (userRole !== 'reviewer') {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ReviewerPrivetRoute;
