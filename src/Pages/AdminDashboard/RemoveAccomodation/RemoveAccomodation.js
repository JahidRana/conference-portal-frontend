import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './RemoveAccommodation.css';

const RemoveAccommodation = () => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        console.log("Fetching accommodations..."); // Debugging log
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/accomodations`);
        
        // Log the entire response
        console.log("Fetched accommodations response:", response.data);
        
        setAccommodations(response.data.accommodations); // Adjust this based on your actual response structure
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      }
    };

    fetchAccommodations();
  }, []);

  const handleRemove = async (id) => {
    try {
      console.log(`Removing accommodation with ID: ${id}`); // Debugging log
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/remove-accommodation/${id}`); // Ensure the correct endpoint
      
      // Log the response from the delete request
      console.log("Delete response:", response.data);

      // Update the state to remove the deleted accommodation
      setAccommodations(accommodations.filter(accommodation => accommodation._id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Accommodation removed successfully!',
      });
    } catch (error) {
      console.error('Error removing accommodation:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Failed to remove accommodation.',
      });
    }
  };

  return (
    <div className="raccommodation-list">
      <h2 className="accommodation-list-title">Accommodation List</h2>
      {accommodations.length > 0 ? (
        <ul className="accommodation-list-items">
          {accommodations.map(accommodation => (
            <li key={accommodation._id} className="accommodation-list-item">
              <h3 className="accommodation-title">{accommodation.title}</h3>
              <p className="accommodation-description">{accommodation.description}</p>
              <img src={accommodation.imageUrl} alt={accommodation.title} className="remove-accommodation-image" />
              <button className="remove-button" onClick={() => handleRemove(accommodation._id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-data-message">No accommodation data available now.</p>
      )}
    </div>
  );
};

export default RemoveAccommodation;
