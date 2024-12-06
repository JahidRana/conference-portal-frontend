import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './UpdateConferenceDate.css';

const UpdateConferenceDate = () => {
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        const dateData = {
            PaperSubmissionDeadline: form.PaperSubmissionDeadline.value,
            AcceptanceNotification: form.AcceptanceNotification.value,
            CameraReadySubmission: form.CameraReadySubmission.value,
            RegistrationDeadline: form.RegistrationDeadline.value,
            ConferenceStartDate: form.ConferenceStartDate.value,
            ConferenceEndDate: form.ConferenceEndDate.value
        };

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/update-date`,
                dateData
            );
            if (response.status === 200) {
                Swal.fire('Updated!', 'Successfully Updated!', 'success');
                navigate('/dates');
            }
        } catch (error) {
            Swal.fire('Error!', 'An error occurred while updating the dates.', 'error');
        }
    };


    return (
        <div className='UpdateDateBG'>
            <h4 className='text-center'>Update Important Dates</h4>
            <form onSubmit={handleSubmit} id="contactForm" className="col-md-6 col-sm-12 col-xs-12 m-auto py-5 mb-5" name="contact">
                {/* Form fields */}
                <div className="mb-3">
                    <label htmlFor="PaperSubmissionDeadline" className="form-label">Paper Submission Deadline</label>
                    <input required name="PaperSubmissionDeadline" type="date" className="form-control" id="PaperSubmissionDeadline" placeholder="Paper Submission Deadline" aria-label="Paper Submission Deadline" />
                </div>
                <div className="mb-3">
                    <label htmlFor="AcceptanceNotification" className="form-label">Acceptance Notification</label>
                    <input required name="AcceptanceNotification" type="date" className="form-control" id="AcceptanceNotification" placeholder="Acceptance Notification" aria-label="Acceptance Notification" />
                </div>
                <div className="mb-3">
                    <label htmlFor="CameraReadySubmission" className="form-label">Camera Ready Submission</label>
                    <input required name="CameraReadySubmission" type="date" className="form-control" id="CameraReadySubmission" placeholder="Camera Ready Submission" aria-label="Camera Ready Submission" />
                </div>
                <div className="mb-3">
                    <label htmlFor="RegistrationDeadline" className="form-label">Registration Deadline</label>
                    <input required name="RegistrationDeadline" type="date" className="form-control" id="RegistrationDeadline" placeholder="Registration Deadline" aria-label="Registration Deadline" />
                </div>

                <div className="form-group-inline mb-3">
                    <label htmlFor="ConferenceStartDate" className="form-label">Conference Dates</label>
                    <input required name="ConferenceStartDate" type="date" className="form-control-inline" id="ConferenceStartDate" placeholder="Start Date" aria-label="Conference Start Date" />
                    <span className="date-separator">to</span>
                    <input required name="ConferenceEndDate" type="date" className="form-control-inline" id="ConferenceEndDate" placeholder="End Date" aria-label="Conference End Date" />
                </div>

                <div className="text-center">
                    <button className="button-57" type='submit'><span className="text">Submit</span><span>Update</span></button>
                </div>
            </form>
        </div>
    );
};

export default UpdateConferenceDate;
