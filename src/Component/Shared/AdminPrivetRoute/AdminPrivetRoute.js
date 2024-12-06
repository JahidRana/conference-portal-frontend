// AdminPrivetRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminPrivetRoute = ({ children }) => {
    const userRole = localStorage.getItem('role');

    // Ensure the user is an admin
    if (userRole !== 'admin') {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default AdminPrivetRoute;
