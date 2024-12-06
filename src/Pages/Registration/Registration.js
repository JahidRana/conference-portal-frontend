import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './registration.css'; // Ensure the correct path

const Registration = () => {
    const [registrationFees, setRegistrationFees] = useState([]);
    const [registrationProcess, setRegistrationProcess] = useState([]); // State for registration process
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch registration fees
                const feesResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/registration-info`);
                setRegistrationFees(feesResponse.data);

                // Fetch registration process
                const processResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/registration-process`);
                setRegistrationProcess(processResponse.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="registration-container">
            <div className="process-section">
                <h1>Registration Process</h1>
                <ul>
                    {registrationProcess.length > 0 ? (
                        registrationProcess.map((step, index) => (
                            <li key={index}>{`Step ${step.step_no}: ${step.process}`}</li>
                        ))
                    ) : (
                        <li>No registration process data available</li>
                    )}
                </ul>
            </div>

            <div className="fees-section">
                <h1>Registration Fees</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Local</th>
                            <th>International</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrationFees.length > 0 ? (
                            registrationFees.map((fee, index) => (
                                <tr key={index}>
                                    <td>{fee.category}</td>
                                    <td>{fee.local}</td>
                                    <td>{fee.international}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No fees data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Registration;
