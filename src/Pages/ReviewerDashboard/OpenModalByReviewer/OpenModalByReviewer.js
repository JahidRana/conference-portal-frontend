import React from 'react';

const OpenModalByReviewer = ({paper, state}) => {
    return (
        <div>
            
           <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-fullscreen pe-4">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title" id="staticBackdropLabel">{state.title}</h2>
                                <button type="button" class="btn-close bg-danger p-3" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            {console.log(paper.fileURL)}
                            <div style={{ height: "1200px" }}>
                                <iframe title={Math.random()} style={{ width: "100%", height: "100%" }} src={`http://localhost:8080/${state.link}`}></iframe>
                            </div>
                            {/* <div class={`container d-flex  justify-content-between align-items-center ${open ? "d-none" : ""}`} >


                                <div class="text-center d-flex align-items-center my-2">
                                    <div>
                                        <textarea style={{ width: "600px", height: "80px" }} class="form-control me-3 required" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                    <div>
                                        <button type="submit" class="btn btn-outline-info"> Add Comment</button>
                                    </div>
                                </div>
                                <div>
                                    <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                            <div className='container text-end'>
                                <button onClick={renderOpenClose} type="submit" class="btn btn-outline-dark "> {open? <BsArrowUpCircleFill /> : <BsArrowDownCircle />} </button>
                            </div> */}
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default OpenModalByReviewer;