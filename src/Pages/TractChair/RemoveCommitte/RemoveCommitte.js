import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './removecommitte.css'; // Import CSS module

function RemoveCommittee() {
    const [committees, setCommittees] = useState([]);

    useEffect(() => {
        fetchCommittees();
    }, []);

    const fetchCommittees = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/committee`);
            setCommittees(response.data);
        } catch (error) {
            console.error('Error fetching committees:', error);
        }
    };

    const removeCommittee = async (id) => {
        try {
            console.log(id);
            await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/remove/committe/${id}`);
            Swal.fire('Removed!', 'The committee has been removed.', 'success');
            // Update the state to reflect the removal
            setCommittees(committees.filter(committee => committee._id !== id));
        } catch (error) {
            console.error('Error removing committee:', error);
            Swal.fire('Error', 'Failed to remove the committee', 'error');
        }
    };

    return (
        <div className="committee-container">
          <h2>Committee List</h2>
          {committees.map((committee, index) => (
            <div className="committee-card" key={index}>
              <div className="committee-details">
                <h3 className="committee-name">{committee.mainCommittee.committeeName}</h3>
            
              </div>
            
              <div className="committee-actions">
                <button className="remove-button" onClick={() => removeCommittee(committee._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
    );
}

export default RemoveCommittee;
