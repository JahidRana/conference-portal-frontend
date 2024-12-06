import React, { useContext, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const AuthorSubmitForm = () => {

    const [fileURL, setFileURL] = useState('');
    const [description, setDescription] = useState('');
    const [Title, setTitle] = useState('');
    let navigate = useNavigate();
      // Retrieve email and role from localStorage
      const email = localStorage.getItem('email');
      const role = localStorage.getItem('role'); // Default to 'author' if role is not set
  
    // const { loggedUser } = useContext(AuthContext);
    // let { from } = location.state || { from: { pathname: "/" } };
    
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('fileURL', fileURL);
        formData.append('title', Title);
        formData.append('email', email);
        formData.append('role', role);  // Send the role data
        formData.append('status', 'Submitted');  // Set status as 'Submitted'
        const proceed = window.confirm("Are You Sure? You Want To Submit")

        if(proceed){
            axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/submit`, formData)
            .then(function (response) {
                console.log(response);
                alert('Paper Submitted Successfully');
                navigate('/history');
            })
            .catch(function (error) {
                console.log(error);
                alert('Paper Submission Failed');
            });
        }
        // fetch('http://localhost:5055/addService', {
        //     method: "POST",
        //     headers: { "Content-type": "application/json" },
        //     body: JSON.stringify(imageData),
        // })

        //     .then(res => {
        //         console.log('server side response: ', res)
        //         if (res) {
        //             alert("your service Added successfully")
        //         }
        //     })


    };


    // const handleImage = (event) => {

        // imageData.set('key', 'eb6f98c2db8a2cc464f62fd61476c603')
        // imageData.append('image', event.target.files[0])


        // axios.post('https://api.imgbb.com/1/upload', imageData)
        //     .then(function (response) {
        //         setImgURL({
        //             image_url: response.data.data.display_url
        //         });
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    // }


    return (
        <div className='container my-4'>
            <label className="mt-3 text-dark"><strong>Title : </strong> </label>
            <textarea className='form-control' type="text" placeholder=" Title " onChange={(e) => setTitle(e.target.value)} value={Title} />


            <label className="mt-3 text-dark"><strong>Description : </strong> </label>
            <textarea className='form-control' type="text" placeholder="Write Here Your Description " onChange={(e) => setDescription(e.target.value)} style={{ height: "150px" }} value={description} />


            <label className="mt-3 text-dark"><strong>Upload your Paper : </strong></label>
            <input type='file' onChange={(e) => setFileURL(e.target.files[0])} />







            <div class="d-grid gap-2 col-6 mx-auto my-4">
                <Link  class="btn btn-primary" to='/author-info'>Submit</Link>
            </div>
            {/* <div class="d-grid gap-2 col-6 mx-auto my-4">
                <button class="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div> */}

        </div>
    );
};

export default AuthorSubmitForm;