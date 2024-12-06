/* eslint-disable import/no-anonymous-default-export */
import requests from "./httpServices";

class CustomizeServices {
    getContent(){
        return requests.get('/home-content');
    }
    postContent(body) {
        return requests.post('/home-content', body);
    }
}


export default  new CustomizeServices();