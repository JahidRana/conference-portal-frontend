import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './RemoveVenu.css'; // Ensure this matches the CSS file name

const VenueList = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/venues`);
        setVenues(response.data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchVenues();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/venues/${id}`);
      setVenues(venues.filter(venue => venue._id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Venue removed successfully!',
      });
    } catch (error) {
      console.error('Error removing venue:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Failed to remove venue.',
      });
    }
  };

  return (
    <div className="venue-list">
      <h2 className="venue-list-title">Venue List</h2>
      <ul className="venue-list-items">
        {venues.map(venue => (
          <li key={venue._id} className="venue-list-item">
            <p className="venue-description">{venue.description}</p>
            <img src={venue.imageUrl} alt={venue.description} className="remove-venue-image" />
            <button className="remove-button" onClick={() => handleRemove(venue._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VenueList;
