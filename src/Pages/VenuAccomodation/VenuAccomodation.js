import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VenuAccomodation.css"; // Ensure the correct path

const VenuAccomodation = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        console.log("Fetching accommodation details..."); // Log when fetching starts
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/accomodations` // Correct spelling
          );


     
        setAccommodations(response.data.accommodations || []); // Set accommodations
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching accommodation details:", error); // Log error details
        setError("Error fetching accommodation details"); // Set error message
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchAccommodations();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    console.log("Loading accommodations..."); // Log while loading
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    console.log("Error encountered:", error); // Log error state
    return <div>{error}</div>; // Show error message if any
  }

  console.log("Accommodations loaded:", accommodations); // Log accommodations after loading

  return (
    <div className="accommodation-details-container">
      <h1>Accommodation Details</h1>
      {accommodations.length > 0 ? (
        <div className="accommodation-list">
          {accommodations.map((accommodation) => (
            <div key={accommodation._id} className="accommodation-item">
              <h2 className="accommodation-title">{accommodation.title}</h2>
              {accommodation.imageUrl && (
                <img
                  src={accommodation.imageUrl}
                  alt={accommodation.title}
                  className="accommodation-image"
                />
              )}
              <p className="accommodation-description">{accommodation.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No accommodation details available.</p>
      )}
    </div>
  );
};

export default VenuAccomodation;
