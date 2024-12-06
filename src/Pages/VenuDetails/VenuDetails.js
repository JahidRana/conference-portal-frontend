import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VenuDetails.css"; // Ensure the correct path

const VenueDetails = () => {
  const [venueDetails, setVenueDetails] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/venues` // Adjust the URL as needed
        );
        setVenueDetails(response.data || []); // Set venue details
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching venue details:", error);
        setError("Error fetching venue details"); // Set error message
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchVenueDetails();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Show error message if any
  }

  return (
    <div className="venue-details-container">
      <h1>Venue Details</h1>
      {venueDetails.length > 0 ? (
        <div className="venue-list">
          {venueDetails.map((venue, index) => (
            <div key={index} className="venue-item">
              {venue.imageUrl && (
                <img
                  src={venue.imageUrl}
                  alt={venue.description}
                  className="venue-image"
                />
              )}
              <p className="venue-description">{venue.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No venue details available.</p>
      )}
    </div>
  );
};

export default VenueDetails;
