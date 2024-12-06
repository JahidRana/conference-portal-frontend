import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AcceptedPaper.module.css';

const AcceptedPaper = () => {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/submit/accepted-papers-list`)
            .then(response => setPapers(response.data.data))
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className={styles['accepted-papers-list-container']}>
            <div className={styles['accepted-papers-section']}>
                <h1>Accepted Paper List</h1>
                {papers.length > 0 ? (
                    papers.map((paper) => (
                        <div className={styles['paper-item']} key={paper._id}>
                            <strong>{paper.title}</strong>
                        </div>
                    ))
                ) : (
                    <p>No papers available</p>
                )}
            </div>
        </div>
    );
};

export default AcceptedPaper;
