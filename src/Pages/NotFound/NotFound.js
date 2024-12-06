// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Page Not Found</h1>
            <p style={styles.message}>
                The page you are looking for does not exist. 
                Please check the URL or go back to the home page.
            </p>
            <Link to="/" style={styles.link}>Return to Home</Link>
        </div>
    );
};

// Basic styles
const styles = {
    container: {
        marginTop:'50px',
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

export default NotFound;
