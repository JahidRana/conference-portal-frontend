import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1`,
    timeout: 2000,
  });

const response = (res) => res.data;



const requests = {
    get : async (url) =>{
        const res = await instance.get(url);
        return response(res);
     } ,
    post : async (url,body) =>{
        const res = await instance.post(url, body);
        // console.log(res);
        return response(res);
    },
    patch : async (url,body) =>{
        const res = await instance.patch(url, body);
        // console.log(res);
        return response(res);
    },
    delete : async (url) =>{
        const res = await instance.delete(url);
        // console.log(res);
        return response(res);
    },

}

export default requests;