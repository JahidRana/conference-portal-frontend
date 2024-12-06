import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./ReviewerReviewPaper.css";

const ReviewPapers = () => {
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [reviewMessage, setReviewMessage] = useState("");
  const [file, setFile] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  const [noPapersMessage, setNoPapersMessage] = useState("");
  const [currentReview, setCurrentReview] = useState(null);

  // Function to fetch papers
  const fetchPapers = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      setError("No email found. Please log in.");
      return;
    }
    setLoading(true);
    const apiUrl = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/reviewer/review-papers?email=${encodeURIComponent(email)}`;
    try {
      const response = await axios.get(apiUrl);
      if (response.data.message) {
        setNoPapersMessage(response.data.message);
      } else {
        setPapers(response.data);
     
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching papers:", error);
      setError("Failed to fetch papers. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers(); // Fetch papers on component mount
  }, []);

  const handleReviewClick = (paper) => {
    setSelectedPaper(paper);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPaper(null);
    setReviewMessage("");
    setFile(null);
    setRecommendation("");
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmitReview = async () => {
    if (!reviewMessage.trim() || !recommendation) {
      Swal.fire(
        "Error",
        "Please provide a review message and recommendation.",
        "error"
      );
      return;
    }

    const formData = new FormData();
    formData.append("reviewMessage", reviewMessage);
    formData.append("reviewDate", new Date().toISOString());
    formData.append("paperId", selectedPaper.id);
    formData.append("reviewerEmail", localStorage.getItem("email"));
    formData.append("recommendation", recommendation);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/reviewer/submit-review`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      Swal.fire("Success", "Reviewed the paper successfully", "success");
      handleCloseModal();
      fetchPapers(); // Re-fetch papers after successful review
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire("Error", "Failed to submit review. Please try again.", "error");
    }
  };

  const handleShowReview = (paper) => {
    setSelectedPaper(paper);
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setCurrentReview(null);
    setSelectedPaper(null);
  };

  return (
    <div className="review-papers-container">
      <h1>Review Papers</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : noPapersMessage ? (
        <p>{noPapersMessage}</p>
      ) : papers.length > 0 ? (
        <ul className="paper-list">
          {papers.map((paper) => {
            const reviewerWithReview = paper.assignedReviewer?.find(
              (reviewer) =>
                reviewer.email === localStorage.getItem("email") &&
                (reviewer.reviewInfo?.reviewMessage ||
                  reviewer.reviewInfo?.reviewPicURL)
            );

            return (
              <li key={paper.id} className="paper-item">
                <span>ID: {paper.id}</span>
                <span>Title: {paper.title}</span>
                <button
  className="show-paper-button"
  onClick={() => {
    console.log("Paper object: ", paper); // Inspect the paper object
    if (paper.paperURL) {
      window.open(paper.paperURL, "_blank", "noopener,noreferrer");
    } else {
      console.error("Cloudinary URL is missing or invalid for this paper:", paper);
    }
  }}
>
  Show Paper
</button>
                
                <button
                  className="review-button"
                  onClick={() => handleReviewClick(paper)}
                >
                  Review
                </button>

                {(paper.reviewMessage || paper.reviewPicURL) && (
                  <button
                    className="show-review-button"
                    onClick={() => handleShowReview(paper)}
                  >
                    Show Review
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No papers to review.</p>
      )}

      {/* Modal for Submitting Review */}
      {showModal && selectedPaper && (
        <div className="modal">
          <div className="modal-content">
            <h2>Review Paper: {selectedPaper.title}</h2>
            <textarea
              className="review-textbox"
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              placeholder="Write your review here..."
            />
            <label htmlFor="recommendation">Recommendation</label>
            <select
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              className="recommendation-dropdown"
            >
              <option value="">Select Recommendation</option>
              <option value="Accept">Accept</option>
              <option value="Reject">Reject</option>
            </select>
            <label htmlFor="optional">File upload (optional)</label>
            <input
              type="file"
              className="file-upload"
              onChange={handleFileChange}
            />
            <div className="modal-actions">
              <button className="submit-button" onClick={handleSubmitReview}>
                Submit Review
              </button>
              <button className="close-button" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Showing Review */}
      {showReviewModal && selectedPaper && (
        <div className="modal">
          <div className="modal-content">
            <h2>Review for Paper: {selectedPaper.title}</h2>
            <p>
              <strong>Review Message:</strong>{" "}
              {selectedPaper.reviewMessage || "N/A"}
            </p>
            <p>
              <strong>Review Image:</strong>{" "}
              {selectedPaper.reviewPicURL ? (
                <a
                  href={selectedPaper.reviewPicURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Image
                </a>
              ) : (
                "N/A"
              )}
            </p>
            <div className="modal-actions">
              <button className="close-button" onClick={handleCloseReviewModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPapers;
