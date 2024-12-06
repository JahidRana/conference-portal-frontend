/* eslint-disable import/no-anonymous-default-export */
import requests from "./httpServices";

class AdminServices {
    getAdmin(){
        return requests.get('/admin');
    }
    postAdmin(body) {
        // console.log(body);
        return requests.post('/admin', body);
    }
    getByEmail(body){
        // console.log(body);
        return requests.post('/admin/get-admin', body);
    }
    RemoveAdminByEmail(email){
        // console.log('body',email);
        return requests.delete(`/admin/admin-list/${email}`);
    }
    RemoveCommitteeById(id) {
        // console.log('ID:', id); // Logging the ID to ensure it's correct
        return requests.delete(`/admin/admin-lists/${id}`);
    }

    RemoveMemberFromCommittee(committeeId, memberId) {
        return requests.delete(`/admin/committee/${committeeId}/member/${memberId}`);
      }
      

    UpdateHomeMassage(body) {
        // console.log(body);
        return requests.patch('/admin/home-content', body);
    }
    UpdateDate(body) {
        // console.log(body);
        return requests.put('/admin/update-date', body);
    }

}


export default  new AdminServices();