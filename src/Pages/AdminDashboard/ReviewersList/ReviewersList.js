import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './ReviewersList.css';

const ReviewersList = () => {
  const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the list of verified and approved reviewers
  const fetchReviewers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/approved-reviewers-list`);
      setReviewers(response.data);
    } catch (error) {
      console.error('Error fetching reviewers:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch reviewers. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete a reviewer
  const handleDelete = async (reviewerId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/reviewer/${reviewerId}`);
          setReviewers(reviewers.filter(reviewer => reviewer._id !== reviewerId));
          Swal.fire('Deleted!', 'Reviewer has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting reviewer:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete reviewer. Please try again later.',
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchReviewers();
  }, []);

  return (
    <div>
      <h2>Approved Users List</h2>
      <div className="reviewer-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          reviewers.length > 0 ? (
            reviewers.map(reviewer => (
              <div key={reviewer._id} className="reviewer-item">
                <div className="reviewer-info">
                  <span className="reviewer-name">{reviewer.firstName} {reviewer.lastName}</span>
                  <span className="reviewer-email">{reviewer.email}</span>
                  <span className="reviewer-role">{reviewer.role}</span>
                </div>
                <button onClick={() => handleDelete(reviewer._id)} className="btns btns-danger ms-3">
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )
        )}
      </div>
    </div>
  );
};

export default ReviewersList;
