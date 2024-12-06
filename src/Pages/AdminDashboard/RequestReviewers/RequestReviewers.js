import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './RequestReviewers.css';

const RequestReviewers = () => {
  const [requestedReviewers, setRequestedReviewers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReviewer, setSelectedReviewer] = useState(null); // For storing the selected reviewer for modal

  useEffect(() => {
    fetchRequestedReviewers();
  }, []);

  const fetchRequestedReviewers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/requested-reviewers`);
      setRequestedReviewers(response.data);
    } catch (error) {
      console.error('Error fetching requested reviewers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (userId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/accept-request`, { userId });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Reviewer Accepted',
          text: 'The reviewer has been successfully accepted.',
        });
        setRequestedReviewers((prevReviewers) =>
          prevReviewers.map((reviewer) =>
            reviewer._id === userId ? { ...reviewer, isApproved: true, reviwerrequestStatus: 'accepted' } : reviewer
          )
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to accept reviewer.',
        });
      }
    } catch (error) {
      console.error('Error accepting reviewer:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  const handleReject = async (userId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/reject-request`, { userId });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Reviewer Rejected',
          text: 'The reviewer has been successfully rejected.',
        });
        setRequestedReviewers((prevReviewers) =>
          prevReviewers.map((reviewer) =>
            reviewer._id === userId ? { ...reviewer, reviwerrequestStatus: 'rejected' } : reviewer
          )
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to reject reviewer.',
        });
      }
    } catch (error) {
      console.error('Error rejecting reviewer:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  // Function to open modal with reviewer details
  const openDetailsModal = (reviewer) => {
    setSelectedReviewer(reviewer); // Set the selected reviewer to display in the modal
  };

  // Function to close the modal
  const closeDetailsModal = () => {
    setSelectedReviewer(null); // Clear the selected reviewer to close the modal
  };

  return (
    <div className="container">
      <h2>Requested Reviewers</h2>
      <div className="reviewer-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          requestedReviewers.length > 0 ? (
            requestedReviewers.map((reviewer) => {
              console.log("Reviewer request status: " + reviewer.reviwerrequestStatus); // Log reviewer request status
              return (
                <div key={reviewer._id} className="reviewer-card">
                  <div>
                    <strong>Name:</strong> {`${reviewer.firstName} ${reviewer.lastName}`}
                  </div>
                  <div>
                    <strong>Email:</strong> {reviewer.email}
                  </div>
                  <div className="action-buttons">
                    <button
                      className="btn btn-info"
                      onClick={() => openDetailsModal(reviewer)}
                    >
                      Details
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => handleAccept(reviewer._id)}
                      disabled={reviewer.isApproved}
                    >
                      {reviewer.isApproved ? 'Accepted' : 'Accept'}
                    </button>
                    <button
                      className={`btn ${reviewer.reviwerrequestStatus === 'rejected' ? 'btn-secondary' : 'btn-danger'}`}
                      onClick={() => handleReject(reviewer._id)}
                      disabled={reviewer.reviwerrequestStatus === 'rejected'}
                    >
                      {reviewer.reviwerrequestStatus === 'rejected' ? 'Rejected' : 'Reject'}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No data available</p>
          )
        )}
      </div>

      {/* Custom Modal */}
      {selectedReviewer && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeDetailsModal}>&times;</button>
            <h3>Reviewer Details</h3>
            <div><strong>Name:</strong> {selectedReviewer.firstName} {selectedReviewer.lastName}</div>
            <div><strong>Email:</strong> {selectedReviewer.email}</div>
            <div><strong>Message:</strong> {selectedReviewer.message || '-'}</div>
            <div><strong>Domain 1:</strong> {selectedReviewer.domain1 || 'Not specified'}</div>
            <div><strong>Domain 2:</strong> {selectedReviewer.domain2 || 'Not specified'}</div>
            <div><strong>Domain 3:</strong> {selectedReviewer.domain3 || 'Not specified'}</div>
            <div><strong>CV:</strong> {selectedReviewer.cvUrl ? <button onClick={() => window.open(selectedReviewer.cvUrl, '_blank')} className="btn-show-cv">Show CV</button> : 'Not Uploaded'}</div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RequestReviewers;
