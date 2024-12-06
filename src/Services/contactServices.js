/* eslint-disable import/no-anonymous-default-export */
import requests from "./httpServices";

class ContactServices {
    getContact(){
        return requests.get('/contact');
    }
    postContact(body) {
        
        return requests.post('/contact', body);
    }
}


export default  new ContactServices();