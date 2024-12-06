import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './AddTourist.css';

const AddTourist = () => {
  const [touristData, setTouristData] = useState({ title: '', description: '', image: null });
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setTouristData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    setTouristData({ ...touristData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!touristData.title || !touristData.description || !touristData.image) {
      Swal.fire("Please provide title, description, and image for the tourist entry.");
      return;
    }

    const formData = new FormData();
    formData.append('title', touristData.title);
    formData.append('description', touristData.description);
    formData.append('image', touristData.image);

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/add-tourist`,
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
        text: 'Tourist information added successfully!',
      });

      navigate('/admin/remove-tourist');
      setTouristData({ title: '', description: '', image: null }); // Reset form after submission
    } catch (error) {
      console.error("Error uploading tourist data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Failed to add tourist information.',
      });
    }
  };

  return (
    <div className="add-tourist">
      <h2 className="add-tourist-title">Add Tourist Information</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="tourist-form-group">
          <label htmlFor="title" className="tourist-label">Title:</label>
          <input
            type="text"
            id="title"
            value={touristData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
            placeholder="Enter tourist title"
            className="tourist-input"
          />

          <label htmlFor="description" className="tourist-label">Description:</label>
          <textarea
            id="description"
            value={touristData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows="4"
            required
            placeholder="Enter tourist description"
            className="tourist-textarea"
          />

          <label htmlFor="image" className="tourist-label">Upload Image:</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            required
            className="tourist-file-input"
          />
        </div>

        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
};

export default AddTourist;
