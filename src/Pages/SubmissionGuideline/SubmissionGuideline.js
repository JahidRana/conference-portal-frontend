import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./sumissionguideline.css"; // Ensure the correct path

const SubmissionGuideline = () => {
  const [guideline, setGuideline] = useState("");
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null); // Track the selected domain
  const [researchAreas, setResearchAreas] = useState([]);
  const [submissionProcess, setsubmissionProcess] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/get-update-submission`
        ); // Adjust the URL as needed
        if (response.data.length > 0) {
          const data = response.data[0]; // Get the first document from the array
          setGuideline(data.guideline || "");
          setsubmissionProcess(data.submissionProcess || []);
        }
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching submission guideline:", error);
        setError("Error fetching data"); // Set error message
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  // Fetch domains and subdomains
  useEffect(() => {
    const fetchDomainsData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/get-cutomize-domains`
        );
        setDomains(response.data || []);
      } catch (error) {
        console.error("Error fetching domains:", error);
        setError("Error fetching domains data");
      }
    };

    fetchDomainsData();
  }, []); // Empty dependency array means this effect runs once on mount
  const handleDomainClick = (domain) => {
    setSelectedDomain(selectedDomain === domain ? null : domain); // Toggle domain details
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Show error message if any
  }

  return (
    <div className="submission-guideline-container">
      <div className="guideline-section">
        <h1>Submission Guideline</h1>
        <p>{guideline}</p>
      </div>
      <div className="submission-process-section">
        <h1>Submission Process</h1>
        <ol>
          {" "}
          {/* Use an ordered list for a numbered index */}
          {submissionProcess.length > 0 ? (
            submissionProcess.map((step, index) => <li key={index}>{step}</li>)
          ) : (
            <li>No submission process available</li>
          )}
        </ol>
      </div>

      <div className="domain-section">
        <h1>Research Areas</h1>
        <ol className="domain-list">
          {domains.length > 0 ? (
            domains.map((domain, index) => (
              <li key={index}>
                <div
                  className="domain-item"
                  onClick={() => handleDomainClick(domain)}
                >
                  <FontAwesomeIcon
                    icon={
                      selectedDomain === domain ? faChevronDown : faChevronRight
                    }
                    className="domain-icon"
                  />
                  <span className="domain-name">{domain.mainDomain}</span>
                </div>
                {selectedDomain === domain && domain.subDomains.length > 0 && (
                  <ol className="subdomain-list">
                    {domain.subDomains.map((subDomain, subIndex) => (
                      <li key={subIndex}>{subDomain}</li>
                    // <li key={subIndex}>
                    // {index + 1}.{subIndex + 1} {subDomain}
                    // </li>
                    ))}
                  </ol>
                )}
              </li>
            ))
          ) : (
            <p>No research areas available</p>
          )}
        </ol>
      </div>
    </div>
  );
};

export default SubmissionGuideline;
