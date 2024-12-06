// Unauthorized.js
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Unauthorized Access</h1>
            <p style={styles.message}>
                You do not have permission to access this page. 
                Please contact the administrator if you believe this is a mistake.
            </p>
            <Link to="/" style={styles.link}>Return to Home</Link>
        </div>
    );
};

// Basic styles
const styles = {
    container: {
        marginTop:'80px',
        textAlign: 'center',
        padding: '50px',
        backgroundColor: '#f9f9f9',
        color: '#333',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '20px',
    },
    message: {
        fontSize: '1.2rem',
        marginBottom: '30px',
    },
    link: {
        fontSize: '1rem',
        color: '#007bff',
        textDecoration: 'none',
    },
};

export default Unauthorized;
