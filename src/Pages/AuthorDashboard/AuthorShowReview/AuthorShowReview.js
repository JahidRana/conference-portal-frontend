import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AuthorShowReview.css"; // Updated the CSS file name to match the component

const AuthorShowReview = () => {
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [errorMessage, setErrorMessage] = useState(""); // Add state for error message

  useEffect(() => {
    // Retrieve email and role from localStorage
    const storedEmail = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role");

    if (storedEmail && storedRole) {
      // Fetch papers with both email and role using axios
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/submit/get-reviews-info`,
          {
            params: {
              email: storedEmail,
              role: storedRole,
            },
          }
        )
        .then((response) => {
          // console.log("Response from backend:", response.data); // Log the response to check if Paper-1 is included

          const data = response.data;

          // If no data is returned, set the appropriate error message
          if (data?.data?.length === 0) {
            setErrorMessage("No Reviewers reviewed your paper yet.");
          } else {
            setReviewData(data?.data || []); // Set the review data if found
            setErrorMessage(""); // Clear any previous error message
          }

          setLoading(false); // Set loading to false after data is fetched
        })
        .catch((error) => {
          // console.error('Error fetching data:', error);
          setErrorMessage("Error loading reviews."); // Set error message on failure
          setLoading(false); // Set loading to false if there is an error
        });
    } else {
      setErrorMessage("No email or role found."); // Set error message if no email and role
      setLoading(false); // Set loading to false if no email and role are found
    }
  }, []);

  // Update to use "reviewers" instead of "assignedReviewer"
  const filteredReviewData = reviewData.filter(
    (paper) =>
      (paper.status === "Accepted" || paper.status === "Rejected") &&
      Array.isArray(paper.reviewers) && // Check if reviewers exist
      paper.reviewers.some(
        (reviewer) =>
          reviewer.reviewMessage ||
          reviewer.recommendation ||
          reviewer.reviewPicURL
      )
  );

  // console.log("Filtered review data:", filteredReviewData); // Log the filtered review data to check if Paper-1 is included

  return (
    <div className="review-container">
      <h4 className="review-title">Review Information</h4>
      {loading ? (
        <p className="loading-message">Loading...</p> // Display loading message or spinner
      ) : (
        <>
          {errorMessage ? (
            <p className="error-message">{errorMessage}</p> // Display error message if any
          ) : (
            <>
              {filteredReviewData.length > 0 ? (
                filteredReviewData.map((paper, paperIndex) => (
                  <div key={paperIndex}>
                    <h5 className="paper-title">Paper Title: {paper.title}</h5>
                    <div className="table-container">
                      <table className="review-table">
                        <thead>
                          <tr>
                            <th>Serial Number</th>
                            <th>Reviewer Name</th>
                            <th>Review Message</th>
                            <th>Recommendation</th>
                            <th>Review Pic</th>
                            <th>Paper Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paper.reviewers.map((review, index) => {
                            // Add console log to check reviewPicURL
                            console.log("Review Object:", review);

                            return review.reviewMessage ||
                              review.recommendation ||
                              review.reviewPicURL ? (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{review.name}</td>
                                <td>{review.reviewMessage || "-"}</td>
                                <td>{review.recommendation || "-"}</td>
                                <td>
                                  {review.reviewPicURL &&
                                  review.reviewPicURL.trim() !== "" &&
                                  review.reviewPicURL !== "-" ? (
                                    <a
                                      href={review.reviewPicURL}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      View Pic
                                    </a>
                                  ) : (
                                    "-"
                                  )}
                                </td>
                                <td>{paper.status}</td>
                              </tr>
                            ) : null;
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data-message">No Data Available</p> // Message if no papers match the status
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AuthorShowReview;
