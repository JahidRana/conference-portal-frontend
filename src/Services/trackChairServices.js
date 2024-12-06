/* eslint-disable import/no-anonymous-default-export */
import requests from "./httpServices";
class TrackServices {

    updatePaperAssigningReviewer(id,body) {
     
        return requests.patch(`reviewer/${id}`, body);
    };
    getPaperById(id){
    
        return requests.get(`submit/${id}`);
    }
    deleteAssignedReviewerByEmail(email){
     
        return requests.delete(`/track-chair/delete-assigned-reviewer/${email}`);
    }
    
}


export default  new TrackServices();