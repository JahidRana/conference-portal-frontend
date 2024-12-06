import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AddReviewerManually.css";

const AddReviewer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/add-user`,
        {
          ...formData,
        }
      );
      if (response.status === 200) {
        const roleMessage =
          formData.role.charAt(0).toUpperCase() + formData.role.slice(1); // Capitalize the first letter
        Swal.fire({
          icon: "success",
          title: `${roleMessage} Added`,
          text: `The ${roleMessage.toLowerCase()} has been successfully added. Password sent to ${formData.email}`,
        });
        // Clear form data
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          role: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="add-reviewer-container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a role
          </option>
          <option value="trackchair">Track Chair</option>
          <option value="reviewer">Reviewer</option>
        </select>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddReviewer;