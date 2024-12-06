import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CustomizeSubmissionDomain.css'; // Import your CSS file

const CustomizeSubmissionDomain = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [domains, setDomains] = useState([{ mainDomain: '', subDomains: [''] }]);

    // Handle changes in input fields
    const handleInputChange = (index, type, value) => {
        const newDomains = [...domains];
        if (type === 'mainDomain') {
            newDomains[index].mainDomain = value;
        } else {
            newDomains[index].subDomains[0] = value; // Handle the first subdomain
        }
        setDomains(newDomains);
    };

    // Add a new domain and subdomain input field
    const addDomainField = () => {
        setDomains([...domains, { mainDomain: '', subDomains: [''] }]);
    };

    // Add more subdomains for a specific main domain
    const addSubDomain = (index) => {
        const newDomains = [...domains];
        newDomains[index].subDomains.push(''); // Add new empty subdomain
        setDomains(newDomains);
    };

    // Handle subdomain input change
    const handleSubDomainChange = (domainIndex, subDomainIndex, value) => {
        const newDomains = [...domains];
        newDomains[domainIndex].subDomains[subDomainIndex] = value;
        setDomains(newDomains);
    };

    // Handle form submission to store data in the database
    const handleSubmit = async () => {
        try {
            // Send domains data to the backend
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/cutomize-domains`,
                { domains }
            );
            // console.log('Data saved:', response.data);

            // Show success notification using Swal
            Swal.fire({
                icon: 'success',
                title: 'Saved!',
                text: 'Domains have been successfully saved.',
            }).then(() => {
                // Navigate to another page after success
                navigate('/submission-guideline'); // Replace '/success-page' with your desired route
            });;
        } catch (error) {
            console.error('Error saving data:', error);

            // Show error notification using Swal
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong while saving domains!',
            });
        }
    };
    return (
        <div className="domain-manager-container">
            <h1 className="domain-manager-title">Customize submission domain</h1>
            {domains.map((domain, index) => (
                <div key={index} className="domain-input-wrapper">
                    <input
                        type="text"
                        placeholder="Main Domain"
                        value={domain.mainDomain}
                        onChange={(e) => handleInputChange(index, 'mainDomain', e.target.value)}
                        className="domain-input"
                    />

                    {domain.subDomains.map((subDomain, subIndex) => (
                        <input
                            key={subIndex}
                            type="text"
                            placeholder="Subdomain"
                            value={subDomain}
                            onChange={(e) => handleSubDomainChange(index, subIndex, e.target.value)}
                            className="subdomain-input"
                        />
                    ))}

                    <button onClick={() => addSubDomain(index)} className="add-subdomain-btn">
                        Add Subdomain
                    </button>
                </div>
            ))}

            <button onClick={addDomainField} className="add-main-domain-btn">
                Add More Main Domain
            </button>
            <button onClick={handleSubmit} className="save-domains-btn">
                Save Domains
            </button>

           
        </div>
    );
};

export default CustomizeSubmissionDomain;
