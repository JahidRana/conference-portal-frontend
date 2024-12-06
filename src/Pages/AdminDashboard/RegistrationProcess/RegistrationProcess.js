import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './registrationProcess.css'; // Assuming you have this CSS file for styling

const RegistrationProcess = () => {
    const [rows, setRows] = useState([{ id: 1 }]);

    const addRow = () => {
        setRows([...rows, { id: rows.length + 1 }]);
    };

    const save = async () => {
        try {
            // Prepare the data to send
            const data = rows.map(row => ({
                step_no: document.getElementsByName(`step_no-${row.id}`)[0].value,
                process: document.getElementsByName(`process-${row.id}`)[0].value,
            }));

            // Make the PUT request using axios
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/registration-process`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Registration process updated successfully!',
                confirmButtonText: 'OK'
            });

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
            <h2 className="form-title mb-4 text-center">Registration Process</h2>
            {rows.map((row, index) => (
                <div key={row.id} className="form-row d-flex align-items-center mb-3">

                    <label className="form-label text-dark ms-3 me-2"><strong>Step No: </strong></label>
                    <input
                        type='text'
                        required
                        name={`step_no-${row.id}`}
                        className="form-control step-no-input"
                    />

                    <label className="form-label text-dark ms-3 me-2"><strong>Process: </strong></label>
                    <input
                        type='text'
                        required
                        name={`process-${row.id}`}
                        className="form-control process-input"
                    />
               
                </div>
            ))}
            <button className="btn btn-primary mt-3" onClick={addRow}>Add More</button>
            <button className="btn btn-primary save" onClick={save}>Update</button>
        </div>
    );
};

export default RegistrationProcess;
