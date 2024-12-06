import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './RemoveSpeaker.css'; // Import CSS module
function RemoveSpeaker() {
    const [speakers, setSpeakers] = useState([]);

    useEffect(() => {
        fetchSpeakers();
    }, []);

    const fetchSpeakers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/speakers`);
            setSpeakers(response.data);
        } catch (error) {
            console.error('Error fetching speakers:', error);
        }
    };

    const removeSpeaker = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/remove/speaker/${id}`);
            Swal.fire('Removed!', 'The speaker has been removed.', 'success');
            // Update the state to reflect the removal
            setSpeakers(speakers.filter(speaker => speaker._id !== id));
        } catch (error) {
            console.error('Error removing speaker:', error);
            Swal.fire('Error', 'Failed to remove the speaker', 'error');
        }
    };
    return (
        <div className="speaker-container">
          <h2>Speaker List</h2>
          {speakers.map((speaker, index) => (
            <div className="speaker-card" key={index}>
              <div className="speaker-details">
                <h3 className="speaker-name">{speaker.name}</h3>
                <p className="speaker-position">{speaker.position}</p>
             
              </div>
              <div className="speaker-actions">
                <button className="remove-button" onClick={() => removeSpeaker(speaker._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
    );
}


export default RemoveSpeaker;
