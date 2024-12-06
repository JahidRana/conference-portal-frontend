import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Schedules.css';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/schedules`);
        const sortedSchedules = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setSchedules(sortedSchedules);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, []);

  const formatTime = (time) => {
    const date = new Date(`1970-01-01T${time}Z`);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
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

  const dayLabels = Object.keys(groupedSchedules)
    .sort((a, b) => new Date(a) - new Date(b))
    .reduce((acc, date, index) => {
      acc[date] = `DAY - ${index + 1}`;
      return acc;
    }, {});

  return (
    <div className="schedule-list">
         <h4 className='text-center'> Program Schedule </h4>
      {/* <h2>Program Schedule</h2> */}
      {schedules.length === 0 ? (
        <p className="no-schedule">No schedule found</p>
      ) : (
        Object.keys(groupedSchedules).map((date) => (
          <div key={date} className="schedule-table">
            <div className="schedule-header">
              <span className="day-label">{dayLabels[date]}</span>
              <h3 className="date-label">Date: {formatDate(date)}</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th className="paper-id">Paper ID</th>
                  <th>Paper Title</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Room</th>
                </tr>
              </thead>
              <tbody>
                {groupedSchedules[date].map((schedule) => (
                  <tr key={schedule._id}>
                    <td>{schedule.paperId}</td>
                    <td>{schedule.title}</td>
                    <td>{formatTime(schedule.timeFrom)}</td>
                    <td>{formatTime(schedule.timeTo)}</td>
                    <td>{schedule.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default Schedule;
