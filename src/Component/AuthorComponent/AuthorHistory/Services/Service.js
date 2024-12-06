import React from 'react';
const Service = (props) => {

    const { fileURL, abstract, title, paperDomain, createdAt } = props.service;
    console.log(fileURL);
    return (

        <div className='card p-2 m-2' style={{ width: "48%" }}>

            <div class="card-block">
                <div class="card-header">
                    <strong className=''>{title}</strong>
                    <h6 className='mt-2'>Paper-domain : {paperDomain}</h6>
                </div>
                <div class="card-body">
                    <p class="abstract-text">{abstract}</p>
                </div>
                <div class="text-muted">
                    <p>Created at : {createdAt}</p>

                    <p>Open as PDF file : <a class="btn btn-primary" target='blank' href={`${process.env.REACT_APP_BACKEND_SERVER_URL}/${fileURL}`}>Open</a>.</p>
                </div>
            </div>



        </div>


    );
};

export default Service;