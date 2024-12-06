import React from 'react';
import makeAdmin from '../../../Services/makeAdmin';
import Swal from 'sweetalert2'

const AddAdmin = () => {
    const handleForm = async (event) =>{
        event.preventDefault();
            const form = event.target
            const email =form.email.value;
    
            const contact ={
                
                email
       
            }
    
    
            const res = await makeAdmin.postAdmin(contact)
            if(res){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Admin Added SuccessFully',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
    } 

    return (
        <div className='text-center'>
            <h1>Add Admin here</h1>
            <form onSubmit={handleForm}>
                        <input className="inputField" type="text"  placeholder="Name" required />
                        <br />

                        <input className="inputField" type="email" name="email" placeholder="Enter your email" required />
                        <br />

                        <input className="btn btn-outline-secondary" type="submit" value="Make Admin" />

                    </form>
        </div>
    );
};

export default AddAdmin;