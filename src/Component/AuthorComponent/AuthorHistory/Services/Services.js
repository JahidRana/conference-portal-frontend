import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Service.css';

const Services = () => {
    const [filteredPaper, setFilteredPaper] = useState([]);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        // Retrieve email and role from localStorage
        const storedEmail = localStorage.getItem('email');
        const storedRole = localStorage.getItem('role');
        
        setEmail(storedEmail);
        setRole(storedRole);

        if (storedEmail && storedRole) {
            // Fetch papers with both email and role using axios
            axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/submit/get-paper-by-email-role`, {
                params: {
                    email: storedEmail,
                    role: storedRole
                }
            })
            .then(response => {
                setFilteredPaper(response.data?.data || []);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false if there is an error
            });
        } else {
            setLoading(false); // Set loading to false if no email and role are found
        }
    }, []);

    return (
        <div className='historyTitle'>
            <h4>History</h4>

            {loading ? (
                <p>Loading...</p> // Display loading message or spinner
            ) : (
                filteredPaper.length > 0 ? (
                    <div className='container ms-1'>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Serial Number</th>
                                    <th>Paper Title</th>
                                    <th>Paper Link</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPaper.map((paper, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{paper.title}</td>
                                        <td>
                                            {paper.cloudinaryURL ? (
                                                <a href={paper.cloudinaryURL} target="_blank" rel="noopener noreferrer">View Paper</a>
                                            ) : (
                                                'N/A'
                                            )}
                                        </td>
                                        <td>{paper.status || 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No papers found.</p>
                )
            )}
        </div>
    );
};

export default Services;
