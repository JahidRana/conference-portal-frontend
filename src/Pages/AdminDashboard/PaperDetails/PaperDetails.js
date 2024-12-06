import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./PaperDetails.css"; // Import CSS for styling

const PaperDetails = () => {
  const { paperId } = useParams();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewers, setReviewers] = useState([]); // Store reviewers for assignment
  const [domains, setDomains] = useState([]); // Domains for filtering reviewers
  const [filteredReviewers, setFilteredReviewers] = useState([]); // Filtered reviewers
  const [selectedDomain, setSelectedDomain] = useState("");
  const [primaryReviewer, setPrimaryReviewer] = useState("");
  const [secondaryReviewer, setSecondaryReviewer] = useState("");
  const [tertiaryReviewer, setTertiaryReviewer] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/submit/get-paper/${paperId}`
      )
      .then((response) => setPaper(response.data.data))
      .catch((error) => setError("Failed to fetch paper details."))
      .finally(() => setLoading(false));
  }, [paperId]);

  useEffect(() => {
    const fetchReviewers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/get-reviewers`
        );
        if (response.status === 200) setReviewers(response.data.data);
      } catch (error) {
        console.error("Error fetching reviewers:", error);
        setError("Failed to fetch reviewers.");
      }
    };

    const fetchDomains = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/get-domains`
        );
        setDomains(response.data);
      } catch (error) {
        console.error("Error fetching domains:", error);
        setError("Failed to fetch domains.");
      }
    };

    fetchReviewers();
    fetchDomains();
  }, []);

  const handleAssignReviewer = () => setIsAssignModalOpen(true);

  const filterReviewersByDomain = (selectedDomain) => {
    const filtered = reviewers.filter(
      (reviewer) =>
        reviewer.domain1 === selectedDomain ||
        reviewer.domain2 === selectedDomain ||
        reviewer.domain3 === selectedDomain
    );
    setFilteredReviewers(filtered);
  };

  const handleDomainChange = (e) => {
    setSelectedDomain(e.target.value);
    filterReviewersByDomain(e.target.value);
  };

  const handleAssignReviewers = async () => {
    if (!primaryReviewer && !secondaryReviewer && !tertiaryReviewer) {
      Swal.fire("Error", "Please select at least one reviewer.", "error");
      return;
    }

    const assignedReviewers = [
      primaryReviewer,
      secondaryReviewer,
      tertiaryReviewer,
    ]
      .filter((reviewer) => reviewer)
      .map((reviewer) => {
        const [firstName, lastName, email] = reviewer.split("|");
        return { name: `${firstName} ${lastName}`, email };
      });

    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/submit/assign-reviewers`,
        {
          paperId: paper._id,
          reviewers: assignedReviewers,
        }
      );

      Swal.fire("Success", "Reviewers assigned successfully.", "success");
      setIsAssignModalOpen(false);
    } catch (error) {
      console.error("Error assigning reviewers:", error);
      Swal.fire("Error", "Failed to assign reviewers.", "error");
    }
  };

  const handleShowReviews = () => {
    if (paper && paper.assignedReviewer && paper.assignedReviewer.length > 0) {
      setIsReviewModalOpen(true);
    } else {
      Swal.fire("No reviews", "No reviewers have been assigned yet.", "info");
    }
  };

  const handleAccept = async () => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/submit/accept-paper`,
        { paperId }
      );
      Swal.fire("Accepted!", "The paper has been accepted.", "success");
      navigate("/admin/customize-paper"); // Redirect to main page
    } catch (error) {
      console.error("Error accepting paper:", error);
      setError("Failed to accept the paper.");
    }
  };

  const handleReject = async () => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/reject-paper`,
        { paperId }
      );
      Swal.fire("Rejected!", "The paper has been rejected.", "success");
      navigate("/admin/customize-paper"); // Redirect to main page
    } catch (error) {
      console.error("Error rejecting paper:", error);
      setError("Failed to reject the paper.");
    }
  };

  const closeModal = () => {
    setIsAssignModalOpen(false);
    setIsReviewModalOpen(false);
    setPrimaryReviewer("");
    setSecondaryReviewer("");
    setTertiaryReviewer("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Format the submission date
  const formattedSubmissionTime = new Date(paper.createdAt).toLocaleString();

 // Apply classes to elements
return (
    <div className="paper-details-container">
      <span className="paper-details-id">Paper ID: {paper.paperID}</span>
      <h2 className="paper-title">{paper.title}</h2>
      <p className="paper-content"><strong>Abstract:</strong> {paper.abstract}</p>
      <p className="paper-content">
        <strong>Keywords:</strong>{" "}
        {Array.isArray(paper.keywords)
          ? paper.keywords.join(", ")
          : paper.keywords}
      </p>
      <p className="paper-content">
        <strong>Paper Submission Time:</strong> {formattedSubmissionTime}
      </p>
      <p><strong>Authors:</strong></p>
      <ul className="authors-list">
        {paper.author && paper.author.length > 0 ? (
          paper.author.map((author) => (
            <li key={author._id}>
              {author.firstName} {author.lastName} ({author.email})
            </li>
          ))
        ) : (
          <li>No authors available</li>
        )}
      </ul>
      <p className="paper-content">
        <strong>Paper Link:</strong>{" "}
        <a
          href={paper.cloudinaryURL}
          target="_blank"
          rel="noopener noreferrer"
          className="paper-link"
        >
          View Paper
        </a>
      </p>
  
      {/* Reviewer Details */}
      <h3 className="paper-content">Reviewer Details</h3>
      {paper.assignedReviewer && paper.assignedReviewer.length > 0 ? (
        <ul className="authors-list">
          {paper.assignedReviewer.map((reviewer, index) => (
            <li key={index}>
              <p><strong>Name:</strong> {reviewer.name}</p>
              <p><strong>Email:</strong> {reviewer.email}</p>
            
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviewers set yet.</p>
      )}
  
      {/* Action Buttons */}
      <div className="action-buttons-container">
        <button className="button-assign" onClick={handleAssignReviewer}>Assign Reviewers</button>
        <button className="button-show-reviews" onClick={handleShowReviews}>Show Reviews</button>
        <button className="button-accept" onClick={handleAccept}>Accept Paper</button>
        <button className="button-reject" onClick={handleReject}>Reject Paper</button>
      </div>
  
      {/* Assign Reviewers Modal */}
      {isAssignModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Assign Reviewers</h2>
            <label htmlFor="domain" className="modal-label">Select Domain:</label>
            <select id="domain" onChange={handleDomainChange} value={selectedDomain} className="modal-select">
              <option value="">Select a Domain</option>
              {domains.map((domain) => (
                <option key={domain._id} value={domain.mainDomain}>
                  {domain.mainDomain}
                </option>
              ))}
            </select>
            {filteredReviewers.length === 0 && selectedDomain && (
              <p>No reviewers found for this domain.</p>
            )}
            {filteredReviewers.length > 0 && (
              <>
                <select value={primaryReviewer} onChange={(e) => setPrimaryReviewer(e.target.value)} className="modal-select">
                  <option value="">Select Reviewer 1</option>
                  {filteredReviewers.map((reviewer) => (
                    <option key={reviewer.email} value={`${reviewer.firstName}|${reviewer.lastName}|${reviewer.email}`}>
                      {reviewer.firstName} {reviewer.lastName} ({reviewer.email})
                    </option>
                  ))}
                </select>
                <select value={secondaryReviewer} onChange={(e) => setSecondaryReviewer(e.target.value)} className="modal-select">
                  <option value="">Select Reviewer 2</option>
                  {filteredReviewers.map((reviewer) => (
                    <option key={reviewer.email} value={`${reviewer.firstName}|${reviewer.lastName}|${reviewer.email}`}>
                      {reviewer.firstName} {reviewer.lastName} ({reviewer.email})
                    </option>
                  ))}
                </select>
                <select value={tertiaryReviewer} onChange={(e) => setTertiaryReviewer(e.target.value)} className="modal-select">
                  <option value="">Select Reviewer 3</option>
                  {filteredReviewers.map((reviewer) => (
                    <option key={reviewer.email} value={`${reviewer.firstName}|${reviewer.lastName}|${reviewer.email}`}>
                      {reviewer.firstName} {reviewer.lastName} ({reviewer.email})
                    </option>
                  ))}
                </select>
              </>
            )}
            <button onClick={handleAssignReviewers} className="modal-button-assign">Assign</button>
            <button onClick={closeModal} className="modal-button-close">Close</button>
          </div>
        </div>
      )}
  
      {/* Show Reviews Modal */}
      {isReviewModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="review-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Review Details</h2>
            <div className="review-table-container">
              <table className="review-table">
                <thead>
                  <tr>
                    <th>Reviewer Name</th>
                    <th>Reviewer Email</th>
                    <th>Review Message</th>
                    <th>Review Image</th>
                    <th>Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {paper.assignedReviewer && paper.assignedReviewer.length > 0 ? (
                    paper.assignedReviewer.map((reviewer, index) => (
                      <tr key={index}>
                        <td>{reviewer.name}</td>
                        <td>{reviewer.email}</td>
                        <td>{reviewer.reviewInfo?.reviewMessage || "-"}</td>
                        <td>
                          {reviewer.reviewInfo?.reviewPicURL ? (
                            <a href={reviewer.reviewInfo.reviewPicURL} target="_blank" rel="noopener noreferrer">View Image</a>
                          ) : "-"}
                        </td>
                        <td>{reviewer.reviewInfo?.recommendation || "-"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No reviews available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button onClick={closeModal} className="modal-button-close">Close</button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default PaperDetails;
