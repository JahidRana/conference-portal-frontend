import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import './RequesForReviewer.css';
const RequestForReviewer = () => {
    const [displayName, setDisplayName] = useState('');
    const [loggedInEmail, setLoggedInEmail] = useState('');
    const [role, setRole] = useState('');
    const [reviewerRequestStatus, setReviewerRequestStatus] = useState(null);
    const [expertiseFields, setExpertiseFields] = useState({
        domain1: '',
        domain2: '',
        domain3: '',
    });
    const [cvFile, setCvFile] = useState(null);
    const [domains, setDomains] = useState([]); // State to store fetched domains

    // Function to check the reviewer request status
    const checkApprovalStatus = async () => {
        const email = localStorage.getItem('email');
       
        
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/reviewer/check/${email}`);
           
            setReviewerRequestStatus(response.data.reviwerrequestStatus);
        } catch (error) {
            console.error('Error checking approval status:', error);
        }
    };

    // Fetch user data and request status
    useEffect(() => {
        const email = localStorage.getItem('email');
        const displayName = localStorage.getItem('displayName');
        const role = localStorage.getItem('role');

        setLoggedInEmail(email);
        setDisplayName(displayName);
        setRole(role);

        checkApprovalStatus(); // Fetch status based on email and role
    }, []);

    // Fetch domains from the server
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

    const handleExpertiseChange = (e) => {
        setExpertiseFields({
            ...expertiseFields,
            [e.target.name]: e.target.value,
        });
    };

    const handleCvUpload = (e) => {
        setCvFile(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Ensure at least one expertise field is selected
        if (!expertiseFields.domain1 && !expertiseFields.domain2 && !expertiseFields.domain3) {
            Swal.fire({
                icon: 'error',
                title: 'No Expertise Selected',
                text: 'Please select at least one expertise field before submitting your request.',
            });
            return; // Prevent form submission if no fields are selected
        }

        const form = event.target;
        const previousRole = role || 'author';
        const newRole = 'reviewer';
        const email = loggedInEmail;
        const message = form.description.value;

        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('previousRole', previousRole);
            formData.append('newRole', newRole);
            formData.append('message', message);
            formData.append('domain1', expertiseFields.domain1);
            formData.append('domain2', expertiseFields.domain2);
            formData.append('domain3', expertiseFields.domain3);
            formData.append('cv', cvFile);

            const res = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/reviewer/newrequest`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 201) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Reviewer Request sent Successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Re-fetch the reviewerRequestStatus from the backend to reflect the latest status
                await checkApprovalStatus(); // This will fetch the updated reviewerRequestStatus
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

    return (
        <div>
            <h2 className="text-center my-3">Provide Your Pertinence</h2>

            {/* Show form to submit a request if the request status is null */}
            {reviewerRequestStatus === null && (
                <form onSubmit={handleSubmit} className="col-md-6 col-sm-12 col-xs-12 m-auto py-3 text-dark" name="contact">
                    <div className="mb-4">
                        <label htmlFor="inputName" className="form-label text-dark"><strong>Name :</strong></label>
                        <input
                            required
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Your Name"
                            disabled
                            value={displayName}
                        />
                    </div>
                    <div className="ml-auto mr-auto mb-4">
                        <label htmlFor="inputEmail" className="form-label text-dark"><strong>Email :</strong></label>
                        <input
                            required
                            name="email"
                            type="email"
                            className="form-control"
                            value={loggedInEmail}
                            disabled
                            placeholder="Your Email"
                        />
                    </div>
                    <div className="ml-auto mr-auto mb-2">
                        <label htmlFor="inputMessage" className="form-label text-dark"><strong>Your Message :</strong></label>
                        <textarea
                            required
                            name="description"
                            className="form-control"
                            id="inputMessage"
                            placeholder="Your Message"
                            style={{ height: '150px' }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label text-dark"><strong>Select your expertise field:</strong></label>
                        <select name="domain1" className="form-control mb-2" value={expertiseFields.domain1} onChange={handleExpertiseChange} required>
                            <option value="">Select Domain 1</option>
                            {domains.map((domain, index) => (
                                <option key={index} value={domain}>{domain}</option>
                            ))}
                        </select>
                        <select name="domain2" className="form-control mb-2" value={expertiseFields.domain2} onChange={handleExpertiseChange}>
                            <option value="">Select Domain 2</option>
                            {domains.map((domain, index) => (
                                <option key={index} value={domain}>{domain}</option>
                            ))}
                        </select>
                        <select name="domain3" className="form-control mb-2" value={expertiseFields.domain3} onChange={handleExpertiseChange}>
                            <option value="">Select Domain 3</option>
                            {domains.map((domain, index) => (
                                <option key={index} value={domain}>{domain}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="form-label text-dark"><strong>Upload your CV:</strong></label>
                        <input type="file" name="cv" className="form-control" onChange={handleCvUpload} required />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-outline-info text-dark" type="submit">
                            Request
                        </button>
                    </div>
                </form>
            )}

            {/* Show message if the request has been sent and is pending */}
            {reviewerRequestStatus === 'submitted' && (
                <p className="text-center text-info reviewstatus-info">You have already sent a request to become a reviewer. Please wait for approval.</p>
            )}

            {/* Show message if the user is already approved as a reviewer */}
            {reviewerRequestStatus === 'accepted' && (
                <p className="text-center text-success">You are already a reviewer!</p>
            )}

            {/* Show message if the request was rejected */}
            {reviewerRequestStatus === 'rejected' && (
                <p className="text-center text-danger">Your reviewer request was rejected.</p>
            )}
        </div>
    );
};

export default RequestForReviewer;
