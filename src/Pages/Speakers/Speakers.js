import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Speaker.css';

const Speakers = () => {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/speakers`);
        setSpeakers(response.data);
        console.log(response);
    } catch (error) {
      console.error('Error fetching speakers:', error);
    }
  };

  return (
    <div className="containerForSpeakers">
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr className="first-thead">
              <th className="table-head" colSpan="2">
                <h1 className="main-heading">Keynote Speakers</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {speakers.map((speaker, index) => (
              <React.Fragment key={index}>
                <tr className="speaker-row">
                  <td style={{ textAlign: 'center' }} align="left">
                    <img
                      src={speaker.picture} // Render speaker image dynamically
                      alt={speaker.name}
                      width="225"
                      height="225"
                    />
                  </td>
                  <td className="speaker-info">
                    <h2 className="speaker-name">{speaker.name}</h2>
                    <p>
                      <span>{speaker.position}</span> {/* Render speaker position dynamically */}
                      <br />
                      <span>{speaker.affiliation}</span> {/* Render speaker affiliation dynamically */}
                      <br />
                   
                      <br />
                      <span>{speaker.website}</span> {/* Render speaker website dynamically */}
                    </p>
                  </td>
                </tr>
                <tr style={{ backgroundColor: index % 2 === 0 ? '#c9e6ff' : '#FACFBE' }}>
                  <td colSpan="2">
                    <strong>Title: {speaker.abstract}</strong> {/* Render speaker abstract dynamically */}
                    <span
                      className="pum-trigger popmake-3104"
                      data-do-default=""
                      style={{ cursor: 'pointer' }}
                    >
                      
                    </span>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Speakers;
