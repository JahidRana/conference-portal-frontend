import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './AddSchedule.css';

const AddSchedule = () => {
  const [schedules, setSchedules] = useState([
    { id: 1, sn: '', date: '', timeFrom: '', timeTo: '', paperId: '', title: '', room: '' }
  ]);
  const [papers, setPapers] = useState([]);
  const lastRowRef = useRef(null);
  const navigate = useNavigate();

  const fetchPapers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/get-papers`);
      setPapers(response.data);
    } catch (error) {
      console.error('Error fetching papers:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Failed to load papers.',
      });
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleInputChange = (id, field, value) => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) =>
        schedule.id === id ? { ...schedule, [field]: value } : schedule
      )
    );
  };

  const handlePaperIdChange = (id, paperId) => {
    handleInputChange(id, 'paperId', paperId);

    if (!paperId.trim()) {
      handleInputChange(id, 'title', '');
      return;
    }
    
    const selectedPaper = papers.find((paper) => paper.paperID.toString() === paperId.trim());
  
    const title = selectedPaper ? selectedPaper.title : 'No paper found';
  
    handleInputChange(id, 'title', title);
  };
  

  const addRow = () => {
    setSchedules([
      ...schedules,
      { id: schedules.length + 1, sn: '', date: '', timeFrom: '', timeTo: '', paperId: '', title: '', room: '' }
    ]);
    lastRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/add-schedule`, schedules, {
        headers: { 'Content-Type': 'application/json' }
      });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Schedules added successfully!',
      });

      navigate('/admin/remove-schedule');
    } catch (error) {
      console.error('Error saving schedules:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Failed to add schedules.',
      });
    }
  };

  return (
    <div className="add-schedule">
      <h2 className="add-schedule-title">Add Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div className="table">
          <div className="table-header">
            <div className="table-cell">SN</div>
            <div className="table-cell">Date</div>
            <div className="table-cell">From</div>
            <div className="table-cell">To</div>
            <div className="table-cell">Room</div>
            <div className="table-cell">Paper ID</div>
            <div className="table-cell">Paper Title</div>
          </div>
          {schedules.map((schedule, index) => (
            <div key={schedule.id} className="table-row" ref={index === schedules.length - 1 ? lastRowRef : null}>
              <input
                type="text"
                placeholder="SN"
                value={schedule.sn}
                onChange={(e) => handleInputChange(schedule.id, 'sn', e.target.value)}
                required
                className="table-cell-input"
              />
              <input
                type="date"
                value={schedule.date}
                onChange={(e) => handleInputChange(schedule.id, 'date', e.target.value)}
                required
                className="table-cell-input"
              />
              <input
                type="time"
                value={schedule.timeFrom}
                onChange={(e) => handleInputChange(schedule.id, 'timeFrom', e.target.value)}
                required
                className="table-cell-input"
              />
              <input
                type="time"
                value={schedule.timeTo}
                onChange={(e) => handleInputChange(schedule.id, 'timeTo', e.target.value)}
                required
                className="table-cell-input"
              />
              <input
                type="text"
                placeholder="Room"
                value={schedule.room}
                onChange={(e) => handleInputChange(schedule.id, 'room', e.target.value)}
                required
                className="table-cell-input"
              />
              <input
                type="text"
                placeholder="Paper ID"
                value={schedule.paperId}
                onChange={(e) => handlePaperIdChange(schedule.id, e.target.value)}
                required
                className="table-cell-input"
              />
              <input
                type="text"
                value={schedule.title}
                placeholder={schedule.paperId ? '' : 'Title'}
                readOnly
                className="table-cell-input select-title"
              />
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-primary mt-3" onClick={addRow}>
          Add More
        </button>
        <button type="submit" className="btn btn-success mt-3 ms-3">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default AddSchedule;
