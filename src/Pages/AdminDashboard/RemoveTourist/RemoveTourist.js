import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './RemoveTourist.css'; // Ensure this matches the CSS file name

const RemoveTourist = () => {
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchTouristPlaces = async () => {
      try {
        console.log("Fetching tourist places..."); // Debugging log
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/tourist-places`);
        setTouristPlaces(response.data.touristPlaces);
      } catch (error) {
        console.error('Error fetching tourist places:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch tourist places.',
        });
      } finally {
        setLoading(false); // Stop loading when fetch is done
      }
    };

    fetchTouristPlaces();
  }, []);

  const handleRemove = async (id) => {
    try {
      console.log(`Removing tourist place with ID: ${id}`); // Debugging log
      await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/tourist-places/${id}`);
      setTouristPlaces(touristPlaces.filter(place => place._id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Tourist place removed successfully!',
      });
    } catch (error) {
      console.error('Error removing tourist place:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Failed to remove tourist place.',
      });
    }
  };

  if (loading) {
    return <p>Loading tourist places...</p>; // Loading state message
  }

  return (
    <div className="tourist-list">
      <h2 className="tourist-list-title">Tourist Place List</h2>
      {touristPlaces.length > 0 ? (
        <ul className="tourist-list-items">
          {touristPlaces.map(place => (
            <li key={place._id} className="tourist-list-item">
              <p className="tourist-description">{place.title}</p>
              {place.imageUrl ? ( // Ensure imageUrl exists
                <img src={place.imageUrl} alt={place.title} className="tourist-image" />
              ) : (
                <p>No image available.</p>
              )}
              <button className="remove-button" onClick={() => handleRemove(place._id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-data">No tourist places available.</p>
      )}
    </div>
  );
};

export default RemoveTourist;
