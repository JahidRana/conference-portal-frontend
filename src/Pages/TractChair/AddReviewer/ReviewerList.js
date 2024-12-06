import React from 'react';

const ReviewerList = ({ reviewer, index, makeReviewer }) => {
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{reviewer.name}</td>
            <td>{reviewer.email}</td>
            <td><button onClick={()=>makeReviewer(reviewer.email)} type="button" class="btn btn-outline-dark">Make Reviewer</button></td>
        </tr>
    );
};

export default ReviewerList;