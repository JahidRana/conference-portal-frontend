import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AddVenue.css';
const AddVenue = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !image) {
      Swal.fire("Please provide both a description and an image.");
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/add-venue`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Venue details added successfully!',
      });
 // Redirect to the Venue List page or another page
 navigate('/admin/remove-venue'); // Change this to your desired rout
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error("Error uploading venue details:", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Failed to add venue details.',
      });
    }
  };

  return (
    <div className="add-venue">
      <h2 className="add-venue-title">Add Venue Details</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="add-venue-form-group">
          <label htmlFor="description" className="add-venue-label">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            rows="4"
            required
            placeholder="Enter venue description"
            className="add-venue-textarea"
          />
        </div>

        <div className="add-venue-form-group">
          <label htmlFor="image" className="add-venue-label">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
            className="add-venue-file-input"
          />
        </div>

        <button type="submit" className="add-venue-submit-button">Add Venue</button>
      </form>
    </div>
  );
};

export default AddVenue;
