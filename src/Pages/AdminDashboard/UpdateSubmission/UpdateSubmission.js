import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from 'react-router-dom'; // Import useNavigate if you're using react-router
import './updateSubmission.css'

const SubmissionForm = () => {
    const [guideline, setGuideline] = useState('');
    const [submissionProcess, setResearchAreas] = useState(['']);
    const navigate = useNavigate(); // Initialize useNavigate

    const addResearchArea = () => {
        setResearchAreas([...submissionProcess, '']);
    };

    const handleResearchAreaChange = (index, value) => {
        const updatedResearchAreas = [...submissionProcess];
        updatedResearchAreas[index] = value;
        setResearchAreas(updatedResearchAreas);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/update-submission`, {
                guideline,
                submissionProcess,
            });

            if (response.status === 200) {
                Swal.fire('Updated!', 'Submission Guideline successfully updated!', 'success');
                navigate('/submission-guideline'); // Navigate to the desired route after success
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Something went wrong!', 'error');
        }
    };

    return (
        <form className="submission-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Submission Guideline:</label>
                <textarea
                    className="form-textarea"
                    value={guideline}
                    onChange={(e) => setGuideline(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Submission Process:</label>
                {submissionProcess.map((area, index) => (
                    <div key={index} className="form-group">
                        <input
                            type="text"
                            className="form-input"
                            value={area}
                            onChange={(e) => handleResearchAreaChange(index, e.target.value)}
                        />
                    </div>
                ))}
                <button type="button" className="add-area-button" onClick={addResearchArea}>Add More Process</button>
            </div>

            <button type="submit" className="submit-button">Submit</button>
        </form>
    );
};

export default SubmissionForm;
