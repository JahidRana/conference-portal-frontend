// TractPrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const TractPrivateRoute = ({ children }) => {
    const userRole = localStorage.getItem('role');

    // Ensure the user is a tract chair
    if (userRole !== 'tractChair') {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default TractPrivateRoute;
