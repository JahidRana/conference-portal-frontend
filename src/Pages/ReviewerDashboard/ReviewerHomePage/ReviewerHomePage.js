import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import './ReviewerHomePage.css';
import ReactPaginate from 'react-paginate';
import OpenModalByReviewer from '../OpenModalByReviewer/OpenModalByReviewer';

const ReviewerHomePage = () => {
    const papers = useLoaderData();
    const [PaperList, setPaperList] = useState([]);
    const [state, setState] = useState({ link: "", title: "" });

    // Retrieve email from localStorage
    const email = localStorage.getItem('email');

    useEffect(() => {
        if (email) {
            fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/submit/get-reviewer-assigned-paper-by-email?email=${email}`)
                .then(res => res.json())
                .then(data => setPaperList(data.data))
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [email]);

    const [pageNumber, setPageNumber] = useState(0);
    const papersPerPage = 8;
    const paperVisited = pageNumber * papersPerPage;
    const paginatePaper = PaperList.slice(paperVisited, paperVisited + papersPerPage);
    const displayPaper = paginatePaper.map((paper, index) => (
        <div className="card p-2 m-2" style={{ width: "48%" }} key={index}>
            <div className="card-block">
                <div>
                    <h5 className='cd-header'>{paper.title}</h5>
                </div>
                <div className='card-body'>
                    <p className="abstract-text">{paper.abstract}</p>
                </div>
                <div className='text-end'>
                    <div className="buttons">
                        {paper.review.reviewInfo.length ? (
                            <Link
                                to={`/reviewer/show-review/${paper._id}`}
                                state={{ paper }}
                                className="btn btn-info me-2"
                            >
                                Show Review
                            </Link>
                        ) : ""}
                        <Link
                            to={`/reviewer/add-review/${paper._id}`}
                            state={{ paper }}
                            className="btn btn-outline-info me-2"
                        >
                            Add Review
                        </Link>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() => setState({ link: paper.fileURL, title: paper.title })}
                        >
                            Open PDF
                        </button>
                    </div>
                </div>
            </div>
            <OpenModalByReviewer paper={paper} state={state} />
        </div>
    ));

    const pageCount = Math.ceil(PaperList.length / papersPerPage);
    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className='ReviewerTitle'>
            <h4 className='text-center'>Paper List</h4>
            <div className='container d-flex ms-4 BGC'>
                {displayPaper}
                {console.log("Paper List:", PaperList)}
            </div>
            <div className='ul-center my-3'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="NEXT >>"
                    onPageChange={handlePageClick}
                    pageCount={pageCount}
                    previousLabel="<< previous"
                    containerClassName={"paginationBtn"}
                    previousLinkClassName={"PreviousBtn"}
                    nextLinkClassName={"nextBtn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
            </div>
        </div>
    );
};

export default ReviewerHomePage;
