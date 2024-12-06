import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2'
import AdminServices from '../../../Services/makeAdmin';
import './ManageAdmin.css'
const ManageAdmin = () => {
    const adminList = useLoaderData()

    const [adminsList, setAdminsList] = useState(adminList.data)
    const removeReviewer = async (email) => {


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
                const res = await AdminServices.RemoveAdminByEmail(email);

                if (res) {
                    Swal.fire(
                        'Deleted!',
                        'Successfully Submitted!',
                        'success'
                    )
                    const remainingUsers = adminsList.filter(user => user.email !== email)
                    setAdminsList(remainingUsers)

                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Paper Submission Failed',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            }
        })
    }
    return (
        <div className='AdminList'>
            <h4 className='text-center'> Admin List </h4>
            <div className='container'>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>{
                        adminsList.map((admin, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{admin.email}</td>
                                    <td><button type="button" class="btn btn-danger" onClick={() => removeReviewer(admin.email)}>Remove</button></td>
                                </tr>
                            )

                        })
                    }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageAdmin;