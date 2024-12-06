import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./SignUp.css";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [domains, setDomains] = useState([]); // Store fetched domains
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    domain1: '', // For reviewer domain selection
    domain2: '',
    domain3: '',
    cv: null // For CV upload (optional)
  });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Fetch the main domains when the component mounts
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/reviewer/get-domain`);
        setDomains(response.data.map(domain => domain.mainDomain));  // Set fetched main domains in the state
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching domains',
          text: 'Unable to retrieve domains from the server',
        });
      }
    };

    fetchDomains();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, cv: e.target.files[0] });
  };

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match',
      });
      setIsLoading(false);
      return;
    }

    // Reviewer role requires at least one domain (domain1, domain2, or domain3) to be selected
    if (formData.role === 'reviewer' && !(formData.domain1 || formData.domain2 || formData.domain3)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select at least one domain.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/new-sign-up/sign-up`, formDataToSend);
      
      // Handle response when a user already exists with the same email and role
      if (response.status === 400 && response.data.message === 'Email already used with this role') {
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: 'This email is already registered with the selected role.',
        });
        setIsLoading(false);
        return;
      }

      if (response.status === 200 && response.data.token) {
        setStep(2); // Proceed to OTP verification step
        localStorage.setItem('signupToken', response.data.token);
  
        Swal.fire({
          icon: 'success',
          title: 'Complete your Signup by OTP',
          text: 'Please check your email for the OTP',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: response.data.message || 'Failed to sign up',
        });
      }
    } catch (error) {
      console.error('Error signing up:', error);
      Swal.fire({
        icon: 'error',
        title: 'Signup Error',
        text: error.response?.data?.message || 'Something went wrong. Please try again later.',
      });
    }
    setIsLoading(false);
};


  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the token from local storage or state
      const token = localStorage.getItem('signupToken');
  
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Verification Error',
          text: 'No token found. Please try signing up again.',
        });
        return;
      }

      // Post OTP and token to the backend
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/new-sign-up/verify-otp`, { otp, token });
    
      // Check if the verification was successful
      if (response.status === 200) {
        const user = response.data.user; // Assuming the user data is returned in the response
        console.log("User info:", user); // Add a console log to debug

        if (user.role === 'reviewer' && !user.isApproved) {
          Swal.fire({
            icon: 'info',
            title: 'Approval Pending',
            text: 'Your account is pending approval by an admin.',
          });
          navigate('/');
        } else if (user.role === 'author' && user.isApproved) {
          Swal.fire({
            icon: 'success',
            title: 'Complete your Registration',
            text: 'You can login your account.',
          });
          navigate('/login');
        } else {
          Swal.fire({
            icon: 'success',
            title: 'OTP Verified',
            text: 'Your account has been successfully verified.',
          }).then(() => {
            // Clear the token after verification
            localStorage.removeItem('signupToken');
            navigate('/thank-you'); // Redirect to the thank you page
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Verification Failed',
          text: response.data.message || 'Failed to verify OTP. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Swal.fire({
        icon: 'error',
        title: 'Verification Error',
        text: error.response?.data?.message || 'Something went wrong. Please try again later.',
      });
    }
};



  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {step === 1 ? (
        <form onSubmit={handleSignup}>
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a role</option>
            <option value="reviewer">Reviewer</option>
            <option value="author">Author</option>
          </select>

          {formData.role === 'reviewer' && (
            <>
              <label>Select your expertise field</label>
              <div className="expertise-field">
                <select name="domain1" value={formData.domain1} onChange={handleChange}>
                  <option value="">Select Domain 1</option>
                  {domains.map((domain, index) => (
                    <option key={index} value={domain}>{domain}</option>
                  ))}
                </select>
                <select name="domain2" value={formData.domain2} onChange={handleChange}>
                  <option value="">Select Domain 2</option>
                  {domains.map((domain, index) => (
                    <option key={index} value={domain}>{domain}</option>
                  ))}
                </select>
                <select name="domain3" value={formData.domain3} onChange={handleChange}>
                  <option value="">Select Domain 3</option>
                  {domains.map((domain, index) => (
                    <option key={index} value={domain}>{domain}</option>
                  ))}
                </select>
              </div>
              <div className="file-upload">
                <label className='fileUpload'>Upload your CV</label>
                <input type="file" name="cv" onChange={handleFileChange} />
              </div>
            </>
          )}

          <button type="submit" className="signin-button" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'SIGN UP'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
};

export default SignUp;
