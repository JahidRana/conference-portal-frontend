import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './AddAccomodation.css';

const AddAccommodation = () => {
  const [accommodation, setAccommodation] = useState({ title: '', image: null, description: '' });
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setAccommodation((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (event) => {
    setAccommodation({ ...accommodation, image: event.target.files[0] }); // Use only the first file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', accommodation.title);
    formData.append('description', accommodation.description);
    formData.append('image', accommodation.image); // Ensure this references the correct file input
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/add-accommodation`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response.data); // Log success response

      // Show success notification
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Accommodation added successfully!',
      });

      // Redirect to accommodation list page (you can change the path as necessary)
      navigate('/admin/remove-accomodation');
      
      // Reset form after submission (if desired)
      setAccommodation({ title: '', image: null, description: '' });
    } catch (error) {
      console.error('Error submitting accommodation:', error.response.data); // Log error response

      // Show error notification
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Failed to add accommodation details.',
      });
    }
  };

  return (
    <div className="add-accommodation">
      <h2 className="add-accommodation-title">Add Accommodation Details</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="add-accommodation-item">
          <div className="add-accommodation-form-group">
            <label htmlFor="title" className="add-accommodation-label">Title:</label>
            <input
              type="text"
              id="title"
              value={accommodation.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
              placeholder="Enter accommodation title"
              className="add-accommodation-input"
            />
          </div>

          <div className="add-accommodation-form-group">
            <label htmlFor="description" className="add-accommodation-label">Description:</label>
            <textarea
              id="description"
              value={accommodation.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows="4"
              required
              placeholder="Enter accommodation description"
              className="add-accommodation-textarea"
            />
          </div>

          <div className="add-accommodation-form-group">
            <label htmlFor="images" className="add-accommodation-label">Upload Image:</label>
            <input
              type="file"
              id="images"
              onChange={handleImageChange} // Use single image change handler
              accept="image/*"
              required
              className="add-accommodation-file-input"
            />
          </div>
        </div>
        <button type="submit" className="add-accommodation-submit-button">Save</button>
      </form>
    </div>
  );
};

export default AddAccommodation;
