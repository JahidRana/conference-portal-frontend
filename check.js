import React, { useState, useEffect } from 'react';
import reviewerServices from '../../../Services/reviewerServices';
import Swal from 'sweetalert2';
import axios from 'axios'; // Make sure axios is imported if you use it for API calls

const RequestForReviewer = () => {
    const [requestedReviewerList, setRequestedReviewerList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        // Get logged user email from local storage
        const loggedInEmail = localStorage.getItem('email');
        
        if (loggedInEmail) {
            // Fetch user data from API based on email
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/user/${loggedInEmail}`);
                    setLoggedUser(response.data);
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to fetch user data.',
                    });
                } finally {
                    setIsLoading(false);
                }
            };

            fetchUserData();
        } else {
            setIsLoading(false);
        }

        // Fetch the list of requested reviewers (if needed)
        const fetchRequestedReviewers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/reviewers`);
                setRequestedReviewerList(response.data);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch requested reviewers.',
                });
            }
        };

        fetchRequestedReviewers();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!loggedUser) {
        return <div>Error: User not logged in</div>;
    }

    const checkRequestedOrNot = requestedReviewerList.filter(item => item?.email === loggedUser.email);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const description = form.description.value;

        const contact = { name, email, description };

        try {
            const res = await reviewerServices.postReviewer(contact);
            if (res) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Reviewer Added Successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                form.reset();
                // Optionally, update the requestedReviewerList after successful submission
                setRequestedReviewerList([...requestedReviewerList, { email }]);
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
            {checkRequestedOrNot.length ? (
                <h1>Already Requested</h1>
            ) : (
                <>
                    <h2 className='text-center my-3'>Provide your Pertinence</h2>
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
                                value={loggedUser?.displayName || ''}
                            />
                        </div>
                        <div className="ml-auto mr-auto mb-4">
                            <label htmlFor="inputEmail" className="form-label text-dark"><strong>Email :</strong></label>
                            <input
                                required
                                name="email"
                                type="email"
                                className="form-control"
                                value={loggedUser?.email || ''}
                                disabled
                                placeholder="Your Email"
                            />
                        </div>
                        <div className="ml-auto mr-auto mb-2">
                            <label htmlFor="inputMassage" className="form-label text-dark"><strong>Your Message :</strong></label>
                            <textarea
                                required
                                name="description"
                                className="form-control"
                                id="inputMassage"
                                placeholder="Your Message"
                                style={{ height: "150px" }}
                            />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-outline-info text-dark" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default RequestForReviewer;
