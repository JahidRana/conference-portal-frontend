import React, { useState } from 'react';
import { useLoaderData, useLocation, useParams } from 'react-router-dom';
import Select from 'react-select';
import trackChairServices from '../../../Services/trackChairServices';

const AssignPaperToReviewer = () => {
    const loadedUser = useLoaderData();
    const {_id} = useParams()
    let { state } = useLocation();
    const [perticularPaperInfo, setPerticularPaperInfo] = useState(state.paper.assignedReviewer);
    const [reviewersList, setReviewersList] = useState(loadedUser.data);
    const options = []
    reviewersList.map(d => options.push({ value: d.email, label: d.email }))

    const [assignedReviewerList, setAssignedReviewersList] = useState([])
    const handleChange = (reviewerEmail) => {
        setAssignedReviewersList(reviewerEmail)
        console.log(options);
    }
    const handleAssigningPaperToReviewer = async(assignedReviewerList) =>{
        

        const res = await trackChairServices.updatePaperAssigningReviewer(_id,assignedReviewerList)

        const paperInfo = await trackChairServices.getPaperById(_id)
        
        setPerticularPaperInfo(paperInfo.data[0].assignedReviewer)
        console.log("paperById", perticularPaperInfo);
        
        if(res.status === "success"){
            console.log("response from backend of handleAssigningPaperToReviewer",res);
        }
    }
    const removeReviewer = (email) =>{
        // trackChairServices.deleteAssignedReviewerByEmail(email)
        // ?.then(data => console.log(data))
       const filtered = perticularPaperInfo.filter(item => item.value !== email)
       setPerticularPaperInfo(filtered);
    }
    return (
        <>
            <div className='d-flex mt-5'>
                <strong for="">Assign reviewer to this paper : </strong>
                <div className='w-75 ms-1'>
                    <Select
                        options={options}
                        value={assignedReviewerList}
                        onChange={handleChange}
                        isMulti={true}
                        isRtl={false}
                    />
                </div>


            </div>
            <div className='text-end'>
                <button type="button" class="btn btn-primary btn-sm me-5 mb-5 mt-2" onClick={() => handleAssigningPaperToReviewer(assignedReviewerList)}> Assign </button>
            </div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>{
                    perticularPaperInfo.map((reviewer, index) => {
                        return (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{reviewer.label}</td>
                                <td>{reviewer.value}</td>
                                {/* <td><button type="button" class="btn btn-danger" onClick={()=>removeReviewer(reviewer.email)}> Assign </button></td> */}
                                <td><button onClick={()=>removeReviewer(reviewer.value)} type="button" class="btn btn-danger"> Remove </button></td>
                            </tr>
                        )

                    })
                }

                </tbody>
            </table>


        </>
    );
};

export default AssignPaperToReviewer;