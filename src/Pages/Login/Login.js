import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';
const SignIn = () => {
  const navigate = useNavigate(); // Initialize useNavigate
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    // const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
       setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/sign-in/signin`, { email, password, role });
            const { token, redirectURL, displayName } = response.data;

            // Store the token, role, and other details in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role); 
            localStorage.setItem('email', email); 
            localStorage.setItem('displayName', displayName); 
            // If login is successful, handle success
            Swal.fire({
                title: 'Login Successful',
                text: `Welcome, ${response.data.displayName}`,
                icon: 'success',
            });

            // Redirect based on role
            navigate(redirectURL);
           

        } catch (error) {
          setIsLoading(false);
            // Handle errors based on status code
            if (error.response) {
                const status = error.response.status;
                const message = error.response.data.message;

                if (status === 400) {
                    Swal.fire({
                        title: 'Login Failed',
                        text: message, // Display the error message from the backend
                        icon: 'error',
                    });
                } else if (status === 403) {
                    Swal.fire({
                        title: 'Access Denied',
                        text: message, // Display the error message from the backend
                        icon: 'warning',
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'An unexpected error occurred. Please try again later.',
                        icon: 'error',
                    });
                }
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Unable to connect to the server. Please try again later.',
                    icon: 'error',
                });
            }
        }
    };

    return (
      <div className="signin-container">
          <div className="signin-box">
              <div className="signin-icon">
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                  </Avatar>
              </div>
              <h2>Sign in</h2>
              <form onSubmit={handleSubmit} className="signin-form">
                  
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
                  <select
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="signin-input"
                      required
                      disabled={isLoading}
                  >
                      <option value="" disabled>Select your role</option>
                      <option value="reviewer">Reviewer</option>
                      <option value="author">Author</option>
                  </select>
                  <button type="submit" className="signin-button" disabled={isLoading}>
                      {isLoading ? 'Signing in...' : 'SIGN IN'}
                  </button>
              </form>
              {/* {errorMessage && <p className="signin-error">{errorMessage}</p>} */}
              <p className="signin-footer">
                  Don't have an account? <a href="/sign-up">Create an account</a>
              </p>
          </div>
      </div>
  );
};

export default SignIn;
