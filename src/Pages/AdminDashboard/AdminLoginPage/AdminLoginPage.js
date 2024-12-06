import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './AdminLoginPage.css';

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if token already exists in local storage
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        
        if (token && role === 'admin') {
            // If a token exists and role is admin, redirect to the dashboard
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/sign-in/signin/admin`, { email, password });
            const { token, role, redirectURL } = response.data;

            // Store the token and user role in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('email', email);

            // Redirect to the dashboard
            navigate(redirectURL);
        } catch (error) {
            setIsLoading(false);
            const errorMsg = error.response?.data?.message || 'Login failed. Please try again.';
            setErrorMessage(errorMsg);
        }
    };

    const handleLogout = () => {
        // Remove token, role, and email from local storage on logout
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        // Redirect to login page after logout
        navigate('/login');
    };
    return (
        <div className="signin-container">
            <div className="signin-box">
                <div className="signin-icon">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                </div>
                <h2>Admin Sign in</h2>
                <form onSubmit={handleLogin} className="signin-form">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="signin-input"
                        required
                        disabled={isLoading}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password *"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="signin-input"
                        required
                        disabled={isLoading}
                    />
                    <button type="submit" className="signin-button" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'SIGN IN'}
                    </button>
                </form>
                {errorMessage && <p className="signin-error">{errorMessage}</p>}
                {/* <p className="signin-footer">
                    Don't have an account? <a href="/signup">Create an account</a>
                </p> */}
            </div>
        </div>
    );
};

export default AdminLoginPage;
