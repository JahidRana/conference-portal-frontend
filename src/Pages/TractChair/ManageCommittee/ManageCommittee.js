import React, { useState } from 'react';
import './manageCommittee.css'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'

const UpdateCommittee = () => {
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        committeeName: "",
        members: [{
            name: '',
            affiliation: '',
            email: '',
            designation: "",
            convenor:"",
        }],

    });
    const [subcommittee, setSubCommittee] = useState({
        subCommitteeName: "",
        subCommitteeMembers: []
    })
    const addFields = () => {
        let object = {
            name: '',
            affiliation: '',
            email: '',
            designation: "",
            convenor:"",
        }
        let members = [...formData['members'], object]
        setFormData({ ...formData, members })
     
    }
    const addSubCommittee = () => {
        let object = {
            name: '',
            affiliation: '',
            email: '',
            designation: ""
        }
        let subCommitteeMembers = [...subcommittee['subCommitteeMembers'], object]
        setSubCommittee({ ...subcommittee, subCommitteeMembers })
     
    }
    const handleAddingSubCommittee = () => {
        let object = {
            name: '',
            affiliation: '',
            email: '',
            designation: ""
        }
        let subCommitteeMembers = [...subcommittee['subCommitteeMembers'], object]
        setSubCommittee({ ...subcommittee, subCommitteeMembers })
       
    }
    const handleFormChange = (event, index) => {

        let data = [...formData['members']];
        data[index][event.target.name] = event.target.value;
 
    }
    const handleSubCommitteeMember = (event, index) => {

        let data = [...subcommittee['subCommitteeMembers']];
        data[index][event.target.name] = event.target.value;
    
    }
    const handleCommitteeName = (event) => {
        let committeeName = event.target.value;
        setFormData({ ...formData, committeeName })
      
    }
    const handleSubCommitteeName = (event) => {
        let subCommitteeName = event.target.value;
        setSubCommittee({ ...subcommittee, subCommitteeName })
        console.log(subcommittee);
    }
    const CreatingCommitteeAndSubCommittee = () => {
        let committeeData = {
            mainCommittee: formData,
            subCommittee: subcommittee
        }
     

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
                axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/create-committee`, committeeData)
                      .then(function (response) {
                        Swal.fire(
                          'Uploaded!',
                          'Committee Creation Completed!',
                          'success'
                        )
                     
                        navigate('/committee');
                      })
                      .catch(function (error) {
                        Swal.fire({
                          position: 'top-end',
                          icon: 'error',
                          title: 'Committee Creation Failed',
                          showConfirmButton: false,
                          timer: 1500
                        })
                      });

            }
        })
        
    }
    return (
        <div className='committeeInputField TitleForCreatingCommittee'>
            <h4 className='text-center'>Add Committee Here</h4>
            <div className='mainCommitteeContainer forWidth'>
                <div className=''>
                    <div className='committeeName'>
                        <label for="name" className='labelStyle'> Committee Name : </label>
                        <input type="text" id="name" name="name" onChange={(e) => handleCommitteeName(e)} />
                    </div>
                    {

                        formData.members.map((val, index) => {
                            return (
                                <div className='d-flex subCommitteeInputContainer'>
                                    <div>
                                        <label for="name">Name : </label>
                                        <input type="text" id="name" name="name" onChange={(e) => handleFormChange(e, index)} />
                                    </div>
                                    <div>
                                        <label for="affiliation">Affiliation : </label>
                                        <input type="text" id="affiliation" name="affiliation" onChange={(e) => handleFormChange(e, index)} />
                                    </div>
                                    <div>
                                        <label for="email">Email : </label>
                                        <input type="email" id="email" name="email" onChange={(e) => handleFormChange(e, index)} />
                                    </div>
                                    <div>
                                        <label for="designation">Designation : </label>
                                        <select id="designation" name="designation" onChange={(e) => handleFormChange(e, index)}>
                                        <option disabled selected>select</option>
                                            <option value="convenor">Convenor</option>
                                            <option value="member">Member</option>
                                            <option value="member-secretary">Member-Secretary</option>
                                        </select>
                                        {/* <input type="text"  /> */}
                                    </div>
                                </div>
                            );
                        })

                    }
                </div>

                <div className='buttonContainer'>
                    <button onClick={addFields} className="add btn btn-outline-secondary buttonStyle"><AiOutlineUserAdd className="fs-4" /> <strong className="mx-2">Add New Member</strong></button>
                </div>

            </div>


            <section className='text-center'>
                <div className='mainCommitteeContainer'>


                    {
                        subcommittee.subCommitteeMembers.length ? "" : <button onClick={addSubCommittee} className="btn btn-outline-secondary d-flex align-items-center"><AiOutlineUserAdd className="fs-4" /> <strong className="mx-2">Add SubCommittee</strong></button>
                    }


                    <div className=''>
                        {
                            subcommittee.subCommitteeMembers.length ?
                                <>
                                    <h4>Add Sub Committee Member Here</h4>
                                    <div className='committeeName'>
                                        <label for="name" className='subCommitteeNameLabel'> Sub Committee Name : </label>
                                        <input type="text" id="name" name="name" onChange={(e) => handleSubCommitteeName(e)} />
                                    </div>
                                </>
                                : ""
                        }

                        {

                            subcommittee.subCommitteeMembers.map((val, index) => {
                                return (
                                    <>

                                        <div className='d-flex subCommitteeInputContainer'>

                                            <div>
                                                <label for="name">Name : </label>
                                                <input type="text" id="name" name="name" onChange={(e) => handleSubCommitteeMember(e, index)} />
                                            </div>
                                            <div>
                                                <label for="affiliation">Affiliation : </label>
                                                <input type="text" id="affiliation" name="affiliation" onChange={(e) => handleSubCommitteeMember(e, index)} />
                                            </div>
                                            <div>
                                                <label for="email">Email : </label>
                                                <input type="email" id="email" name="email" onChange={(e) => handleSubCommitteeMember(e, index)} />
                                            </div>
                                            <div>
                                                <label for="designation">Designation : </label>
                                                <input type="text" id="designation" name="designation" onChange={(e) => handleSubCommitteeMember(e, index)} />
                                            </div>
                                        </div>
                                    </>

                                );
                            })

                        }
                        {
                            subcommittee.subCommitteeMembers.length ? <div className='buttonContainer'>
                                <button onClick={handleAddingSubCommittee} className=" btn btn-outline-secondary"><AiOutlineUserAdd className="fs-4" /> <strong>Add More Member</strong></button>
                            </div> : ""
                        }



                    </div>
                </div>
            </section>
            <div className='text-end me-5 mb-2'>
                <button className="button-81" onClick={CreatingCommitteeAndSubCommittee}>Submit</button>
            </div>

        </div>
    );
};

export default UpdateCommittee;