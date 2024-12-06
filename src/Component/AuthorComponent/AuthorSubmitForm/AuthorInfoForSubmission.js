import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthorInfoForSubmission = () => {
  const [fileURL, setFileURL] = useState("");
  const [description, setDescription] = useState("");
  const [Title, setTitle] = useState("");
  let navigate = useNavigate();

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("fileURL", fileURL);
    formData.append("title", Title);
    formData.append("email", localStorage.getItem("email"));
    formData.append("role", localStorage.getItem("role")); // Include role here
    formData.append("status", "Submitted"); // Set status as 'Submitted'
    console.log("Retrieved role:", localStorage.getItem("role"));
    console.log("FormData before submit:", formData);

    const proceed = window.confirm("Are You Sure? You Want To Submit");

    if (proceed) {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/submit`,
          formData
        )
        .then(function (response) {
          console.log(response);
          alert("Paper Submitted Successfully");
          navigate("/history");
        })
        .catch(function (error) {
          console.log(error);
          alert("Paper Submission Failed");
        });
    }

    console.log("12", formData);
  };
  return (
    <div>
      <div className="container my-4">
        <label className="mt-3 text-dark">
          <strong>Title : </strong>{" "}
        </label>
        <textarea
          className="form-control"
          type="text"
          placeholder=" Title "
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="mt-3 text-dark">
          <strong>Description : </strong>{" "}
        </label>
        <textarea
          className="form-control"
          type="text"
          placeholder="Write Here Your Description "
          onChange={(e) => setDescription(e.target.value)}
          style={{ height: "150px" }}
        />

        <label className="mt-3 text-dark">
          <strong>Upload your Paper : </strong>
        </label>
        <input type="file" onChange={(e) => setFileURL(e.target.files[0])} />

        <div class="d-grid gap-2 col-6 mx-auto my-4">
          <button class="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfoForSubmission;
