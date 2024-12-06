import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AuthContext } from '../../../Component/Context/AuthProvider/AuthProvider';
import './Addreview.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'
import reviewerServices from '../../../Services/reviewerServices';

const AddReview = () => {
    const location = useLocation();
    const { paper } = location.state;
    const { loggedUser } = useContext(AuthContext);
    const [currentDate, setCurrentDate] = useState("");

    let navigate = useNavigate();
    const {_id} = useParams();
    console.log(_id);
    const [formData, setFormData] = useState({
    info : [{
        overallEvaluation: '',
        detailsEvaluation: '',
        abstractEvaluation: '',
        introductionEvaluation: "",
        literatureEvaluation: "",
        resultEvaluation: "",
        commentToTCP: "",
        referenceReview: ""
        }
    ]
}
    );
    const handleAddingReview = async (event) => {
        event.preventDefault();
        let body = {
         reviewDate :    currentDate,
         Reviewer : {
            displayName : loggedUser.displayName,
            email : loggedUser.email,
            photoURL : loggedUser.photoURL
        },
         reviewInfo : formData.info,
        }
        console.log("handleAddingReview", body);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes !'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await reviewerServices.uploadingReview(_id,body)
                if (res) {
                    Swal.fire(
                        'Uploaded!',
                        'Review Successfully Uploaded!',
                        'success'
                      )
                      console.log('llllllllllllll', res);
                }else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Committee Creation Failed',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
                

            }
        })
    };
    const handleFormChange = (event) => {
         let data = [...formData["info"]];
         console.log(data);
         data[0][event.target.name] = event.target.value;
    }

    useEffect(() => {
        // Get the current date and time
        const currentDate = new Date();

        // Format the current date and time in the desired short format
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1
            }/${currentDate.getFullYear()} ${formatAMPM(currentDate)}`;

        // Update the state with the formatted date
        setCurrentDate(formattedDate);
    }, []);

    // Function to format the time in 12-hour format with AM/PM
    const formatAMPM = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";

        // Convert hours from 24-hour format to 12-hour format
        hours %= 12;
        hours = hours || 12;

        // Ensure minutes are always displayed with two digits
        minutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${minutes} ${ampm}`;
    };

    return (
        <>


            <div class="style d-flex align-items-center w-auto m-auto">
                <hr />
                <h5 className='text-center reviewerName'><p>Reviewing By <strong>{loggedUser.displayName}</strong></p></h5>
                <hr />
            </div>

            <div className='container px-5 py-5 form-body'>

                <section className=''>
                    <p><strong>Paper Title : {paper.title}</strong></p>
                    <p>Paper Domain : {paper.paperDomain}</p>
                    <p>Current Date And Time : {currentDate}</p>
                </section>
                <form onSubmit={handleAddingReview} className='p-5 ms-5 container'>
                    <section className='d-flex align-items-center'>
                        <strong><label for="" className='text-dark'> Overall Evaluation : </label></strong>
                        <select class="form-select form-select-lg ms-5 w-75 ms-auto" aria-label=".form-select-lg example align-items-center" name="overallEvaluation" onChange={(e) => handleFormChange(e)}>
                            <option selected>Click For Overall Evaluation</option>
                            <option value="Strong Accept">Strong Accept</option>
                            <option value="Accept">Accept</option>
                            <option value="Weak Accept">Weak Accept</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Weak Reject">Weak Reject</option>
                            <option value="Reject">Reject</option>
                            <option value="Strong Reject">Strong Reject</option>
                        </select>
                    </section>
                    <section>
                        <div class="my-3 d-flex align-items-center">
                            <strong><label for="exampleFormControlTextarea1" class="form-label text-dark">Details Evaluation : </label></strong>
                            <textarea class="form-control w-75 ms-auto" id="exampleFormControlTextarea1" rows="3" placeholder='Provide Your Details Evaluation ...'
                            name="detailsEvaluation" onChange={(e) => handleFormChange(e)}></textarea >
                        </div>
                    </section>
                    <section className='d-flex align-items-center mb-3'>
                        <strong><label for="" className='text-dark'> Abstract : </label></strong>
                        <select class="form-select form-select-lg ms-5 w-75 ms-auto" aria-label=".form-select-lg example align-items-center" name="abstractEvaluation" onChange={(e) => handleFormChange(e)}>
                            <option selected>Open this select menu</option>
                            <option value="Strong Accept">Strong Accept</option>
                            <option value="Accept">Accept</option>
                            <option value="Weak Accept">Weak Accept</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Weak Reject">Weak Reject</option>
                            <option value="Reject">Reject</option>
                            <option value="Strong Reject">Strong Reject</option>
                        </select>
                    </section>
                    <section className='d-flex align-items-center mb-3'>
                        <strong><label for="" className='text-dark'> Introduction : </label></strong>
                        <select class="form-select form-select-lg ms-5 w-75 ms-auto" aria-label=".form-select-lg example align-items-center" name="introductionEvaluation" onChange={(e) => handleFormChange(e)}>
                            <option selected>Open this select menu</option>
                            <option value="Strong Accept">Strong Accept</option>
                            <option value="Accept">Accept</option>
                            <option value="Weak Accept">Weak Accept</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Weak Reject">Weak Reject</option>
                            <option value="Reject">Reject</option>
                            <option value="Strong Reject">Strong Reject</option>
                        </select>
                    </section>
                    <section className='d-flex align-items-center mb-3'>
                        <strong><label for="" className='text-dark'> Literature Review : </label></strong>
                        <select class="form-select form-select-lg ms-5 w-75 ms-auto" aria-label=".form-select-lg example align-items-center" name="literatureEvaluation" onChange={(e) => handleFormChange(e)}>
                            <option selected>Open this select menu</option>
                            <option value="Strong Accept">Strong Accept</option>
                            <option value="Accept">Accept</option>
                            <option value="Weak Accept">Weak Accept</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Weak Reject">Weak Reject</option>
                            <option value="Reject">Reject</option>
                            <option value="Strong Reject">Strong Reject</option>
                        </select>
                    </section>
                    <section className='d-flex align-items-center mb-3'>
                        <strong><label for="" className='text-dark'> Result : </label></strong>
                        <select class="form-select form-select-lg ms-5 w-75 ms-auto" aria-label=".form-select-lg example align-items-center" name="resultEvaluation" onChange={(e) => handleFormChange(e)}>
                            <option selected>Open this select menu</option>
                            <option value="Strong Accept">Strong Accept</option>
                            <option value="Accept">Accept</option>
                            <option value="Weak Accept">Weak Accept</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Weak Reject">Weak Reject</option>
                            <option value="Reject">Reject</option>
                            <option value="Strong Reject">Strong Reject</option>
                        </select>
                    </section>
                    <section>
                        <div class="my-3 d-flex align-items-center">
                            <strong><label for="exampleFormControlTextarea1" class="form-label text-dark">Comment To TCP : </label></strong>
                            <textarea name="commentToTCP" onChange={(e) => handleFormChange(e)} class="form-control w-75 ms-auto" id="exampleFormControlTextarea1" rows="3" placeholder='Comment To TCP ...' ></textarea>
                        </div>
                    </section>
                    <section className='d-flex align-items-center mb-3'>
                        <strong><label for="" className='text-dark'> Reference Review: </label></strong>
                        <select class="form-select form-select-lg ms-5 w-75 ms-auto" aria-label=".form-select-lg example align-items-center" name="referenceReview" onChange={(e) => handleFormChange(e)}>
                            <option selected>Open this select menu</option>
                            <option value="Strong Accept">Strong Accept</option>
                            <option value="Accept">Accept</option>
                            <option value="Weak Accept">Weak Accept</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Weak Reject">Weak Reject</option>
                            <option value="Reject">Reject</option>
                            <option value="Strong Reject">Strong Reject</option>
                        </select>
                    </section>
                    <section class="d-grid gap-2 col-6 mx-auto">
                        <button class="btn btn-primary" type="submit"><strong> Submit </strong></button>
                    </section>
                </form>


            </div>
        </>
    );
};

export default AddReview;