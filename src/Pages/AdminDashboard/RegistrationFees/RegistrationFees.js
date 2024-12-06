import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './RegistrationFees.css'; // Assuming you have this CSS file for styling

const RegistrationForm = () => {
    const [rows, setRows] = useState([{ id: 1 }]);

    const addRow = () => {
        setRows([...rows, { id: rows.length + 1 }]);
    };

    const save = async () => {
        try {
            // Prepare the data to send
            const data = rows.map(row => ({
                category: document.getElementById(`category-${row.id}`).value,
                local: document.getElementsByName(`local-${row.id}`)[0].value,
                international: document.getElementsByName(`international-${row.id}`)[0].value,
            }));

            // Make the POST request using axios
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/registration-fee`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Data update successfully!',
                confirmButtonText: 'OK'
            });

            
            // Handle response
        } catch (error) {
            // Show error alert
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error saving data!',
                confirmButtonText: 'Try Again'
            });

            console.error('Error saving data:', error);
        }
    };

    return (
        <div className="registration-form">
            <h2 className="form-title mb-4 text-center">Registration Fees</h2>
            {rows.map((row, index) => (
                <div key={row.id} className="form-row d-flex align-items-center mb-3">
                    <label className="form-label text-dark me-2"><strong>Category: </strong></label>
                    <select
                        id={`category-${row.id}`}
                        className="form-select category-select"
                        aria-label="Default select example"
                        defaultValue=""
                    >
                        <option value="" disabled>Select Options</option>
                        <option value="General authors">General authors</option>
                        <option value="Student authors">Student authors</option>
                        <option value="Participants">Participants</option>
                    </select>

                    <label className="form-label text-dark ms-3 me-2"><strong>Local: </strong></label>
                    <input
                        type='text'
                        required
                        name={`local-${row.id}`}
                        className="form-control local-input"
                    />

                    <label className="form-label text-dark ms-3 me-2"><strong>International: </strong></label>
                    <input
                        type='text'
                        required
                        name={`international-${row.id}`}
                        className="form-control international-input"
                    />
               
                </div>
            ))}
            <button className="btn btn-primary mt-3" onClick={addRow}>Add More</button>
            <button className="btn btn-primary save" onClick={save}>Update</button>
        </div>
    );
};

export default RegistrationForm;
