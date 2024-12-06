import React from 'react';
import contactServices from '../../Services/contactServices';
import './Contact.css'

const Contact = () => {
    const handleSubmit = async (event) =>{
        event.preventDefault();
        const form = event.target
        const name = form.name.value;
        const email =form.email.value;
        const description = form.description.value;
        const contact ={
            name,
            email,
            description
        }


        const res = await contactServices.postContact(contact)
        if(res){
            console.log("res received");
        }
        
    }
    
    return (
        <div className='contactBG'>
            <form onSubmit={handleSubmit} id="contactForm" class="col-md-6 col-sm-12 col-xs-12  m-auto py-5" name="contact">
                
                <div class="mb-3">
                    <label for="inputName" class="form-label">Name</label>
                    <input required="true" name="name" type="text" class="form-control" id="inputName" placeholder="Your Name"/>
                </div>
                <div class=" ml-auto mr-auto mb-3">
                    <label for="inputEmail" class="form-label">Email</label>
                    <input required="true" name="email" type="text" class="form-control" id="inputEmail" placeholder="Your Email"/>
                </div>
                <div class="ml-auto mr-auto mb-3">
                    <label for="inputMassage" class="form-label">Your Massage
                    </label>
                    <textarea required="" name="description" type="text" class="form-control" id="inputMassage" placeholder="Your Massage" style={{height: "150px"}}>
                    </textarea>
                </div>
                <div className="text-center">
                    <button class="btn btn-outline-success text-light" type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Contact;