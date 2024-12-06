import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './RemoveSchedule.css';

const RemoveSchedule = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/schedules`);
        setSchedules(response.data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };
    fetchSchedules();
  }, []);

  const handleRemove = async (id) => {
    console.log('Attempting to delete schedule with ID:', id); 
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/schedules/${id}`);
      setSchedules(schedules.filter((schedule) => schedule._id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Schedule Removed!',
        text: 'The schedule has been removed successfully.',
      });
    } catch (error) {
      console.error('Error removing schedule:', error.response?.data || error.message);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Failed to remove schedule.',
      });
    }
  };


  const formatTime = (time) => {
    const date = new Date(`1970-01-01T${time}Z`);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    return formattedTime;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
  };

  const groupedSchedules = schedules.reduce((groups, schedule) => {
    const date = schedule.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(schedule);
    return groups;
  }, {});

  return (
    <div className="remove-schedule">
      <h2>Remove Schedule</h2>
      {Object.keys(groupedSchedules).map((date) => (
        <div key={date} className="schedule-table">
         <h3>Date: {formatDate(date)}</h3>
          <table>
            <thead>
              <tr>
                <th>SN</th>
                <th className="paper-ids">Paper ID</th>
                <th>Paper Title</th>
                <th>From</th>
                <th>To</th>
                <th>Room</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedSchedules[date].map((schedule) => (
                <tr key={schedule._id}>
                  <td>{schedule.sn}</td>
                  <td>{schedule.paperId}</td>
                  <td>{schedule.title}</td>
                  <td>{formatTime(schedule.timeFrom)}</td>
                  <td>{formatTime(schedule.timeTo)}</td>
                  <td>{schedule.room}</td>
                  <td>
                    <button
                      onClick={() => handleRemove(schedule._id)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default RemoveSchedule;
