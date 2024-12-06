import React, { useContext, useState, useEffect } from "react";
import "./Form.css";
import PaperInfo from "./PaperInfo";
import FilesUpload from "./FilesUpload";
import validator from "validator";
import AuthorInfo from "./AuthorInfo";
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';

function Form() {
    const loggedUser = {
        displayName: localStorage.getItem('displayName'),
        email: localStorage.getItem('email'),
        role: localStorage.getItem('role')
    };

    const [page, setPage] = useState(0);
    const [wordLimit, setWordLimit] = useState(0);
    const [isValid, setIsValid] = useState(true);
    const [researchAreas, setResearchAreas] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        abstract: "",
        keywords: "",
        fileURL: "",
        paperDomain1: '', 
        paperDomain2: '', 
        paperDomain3: '',
        role: loggedUser.role,
        status: 'Submitted',
        author: [{
            firstName: loggedUser?.displayName ? loggedUser?.displayName.split(' ')[0] : "",
            lastName: loggedUser?.displayName ? loggedUser?.displayName.split(' ')[1] : "",
            email: loggedUser?.email,
            affiliation: '',
            country: "",
            state: "",
            city: "",
            postCode: "",
            street: "",
            line1: "",
            line2: "",
        }],
    });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/get-cutomize-domains`)
            .then(response => {
                setResearchAreas(response.data);
            })
            .catch(error => {
                console.error("Error fetching research areas:", error);
            });
    }, []);

    const FormTitles = ["Provide Paper Info", "Provide Author Info", "Upload Your Files"];
    let navigate = useNavigate();

    const addFields = () => {
        let object = {
            firstName: "",
            lastName: "",
            email: '',
            affiliation: '',
            country: "",
            state: "",
            city: "",
            postCode: "",
            street: "",
            line1: "",
            line2: "",
        };
        let author = [...formData['author'], object];
        setFormData({ ...formData, author });
    };

    const handleFormChange = (event, index) => {
        let data = [...formData['author']];
        data[index][event.target.name] = event.target.value;
    };

    const handleSubmit = () => {
        if (!formData.fileURL) {
            Swal.fire({
                icon: 'error',
                title: 'No file selected',
                text: 'Please select a file to upload.',
            });
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes !'
        }).then((result) => {
            if (result.isConfirmed) {
                const Data = new FormData();
                Data.append('title', formData.title);
                Data.append('abstract', formData.abstract);
                Data.append('keywords', formData.keywords);
                Data.append('file', formData.fileURL);
                Data.append('role', formData.role);
                Data.append('status', formData.status);
                
                const paperDomains = [
                    formData.paperDomain1,
                    formData.paperDomain2,
                    formData.paperDomain3
                ];

                Data.append('paperDomains', JSON.stringify(paperDomains));
                formData.author.forEach((element, index) => {
                    Data.append(`author[${index}][firstName]`, element.firstName);
                    Data.append(`author[${index}][lastName]`, element.lastName);
                    Data.append(`author[${index}][email]`, element.email);
                    Data.append(`author[${index}][affiliation]`, element.affiliation);
                    Data.append(`author[${index}][country]`, element.country);
                    Data.append(`author[${index}][state]`, element.state);
                    Data.append(`author[${index}][city]`, element.city);
                    Data.append(`author[${index}][postCode]`, element.postCode);
                    Data.append(`author[${index}][street]`, element.street);
                    Data.append(`author[${index}][line1]`, element.line1);
                    Data.append(`author[${index}][line2]`, element.line2);
                });

                axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/submit/upload`, Data)
                    .then(function (response) {
                        Swal.fire(
                            'Uploaded!',
                            'Successfully Submitted!',
                            'success'
                        );
                        if (loggedUser.role === 'author') {
                            navigate('/author/history');
                        } else if (loggedUser.role === 'reviewer') {
                            navigate('/');
                        } else {
                            navigate('/');
                        }
                    })
                    .catch(function (error) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Paper Submission Failed',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
            }
        });
    };

    const PageDisplay = () => {
        if (page === 0) {
            return <PaperInfo 
                        formData={formData} 
                        setFormData={setFormData} 
                        wordLimit={wordLimit} 
                        setWordLimit={setWordLimit} 
                        setIsValid={setIsValid} 
                        isValid={isValid} 
                    />;
        } else if (page === 1) {
            return (
                <>
                    {formData?.author?.map((specific, index) => (
                        <AuthorInfo key={index} formData={formData} setFormData={setFormData} specific={specific} index={index} handleFormChange={handleFormChange} />
                    ))}
                    <button onClick={addFields} className="add btn btn-outline-secondary d-flex align-items-center">
                        <AiOutlineUserAdd className="fs-4" /> 
                        <strong className="mx-2">Add More Author</strong>
                    </button>
                </>
            );
        } else {
            return <FilesUpload formData={formData} setFormData={setFormData} researchAreas={researchAreas} />;
        }
    };

    return (
        <div className="form-container container m-4">
            <div className="">
                <div className="header">
                    <h2>{FormTitles[page]}</h2>
                    <div className="progressbar">
                        <div style={{ width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%" }}></div>
                    </div>
                </div>
                <div className="body">{PageDisplay()}</div>
                <div className="footer my-4">
                    <button
                        disabled={page === 0}
                        onClick={() => setPage((currPage) => currPage - 1)}
                    >
                        <IoIosArrowBack />  Prev
                    </button>
                    {isValid &&
                        <button
                            onClick={() => {
                                if (page === FormTitles.length - 1) {
                                    handleSubmit();
                                } else {
                                    if (validator.isEmpty(formData.title) || validator.isEmpty(formData.abstract)) {
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'error',
                                            title: 'Please Provide * Marked Fields',
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                    } else {
                                        setPage((currPage) => currPage + 1);
                                    }
                                }
                            }}
                        >
                            {page === FormTitles.length - 1 ? "Submit" : <>Next <MdOutlineArrowForwardIos /></>}
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default Form;
