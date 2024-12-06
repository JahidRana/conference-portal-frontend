import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AddSpeaker.css';

function AddSpeaker() {
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        position: '',
        university: '',
        abstract: '',
        website: '',
    });
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('name', formData.name);
        data.append('position', formData.position);
        data.append('university', formData.university);
        data.append('abstract', formData.abstract);
        data.append('website', formData.website);
        if (file) {
            data.append('picture', file);
        }
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/speaker`, data);
            if (response.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Speaker added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                // Reset the form fields after successful submission
                setFormData({
                    title: '',
                    name: '',
                    position: '',
                    university: '',
                    abstract: '',
                    website: '',
                });
                setFile(null);
            } else {
                throw new Error('Failed to add speaker');
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add speaker',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="speaker-form">
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" />
            <input type="text" name="university" value={formData.university} onChange={handleChange} placeholder="University" />
            <textarea name="abstract" value={formData.abstract} onChange={handleChange} placeholder="Abstract"></textarea>
            <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="Website" />
            <input type="file" name="picture" onChange={handleFileChange} />
            <button type="submit">Submit</button>
        </form>
    );
}

export default AddSpeaker;
