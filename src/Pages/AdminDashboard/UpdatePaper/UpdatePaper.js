import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import './updatePaper.css';

const PaperList = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const papersPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/submit/get-papers`)
      .then((response) => setPapers(response.data.data))
      .catch((error) =>
        setError("Failed to fetch papers. Please try again later.")
      )
      .finally(() => setLoading(false));
  }, []);

  const indexOfLastPaper = currentPage * papersPerPage;
  const indexOfFirstPaper = indexOfLastPaper - papersPerPage;
  const currentPapers = papers.slice(indexOfFirstPaper, indexOfLastPaper);
  const totalPages = Math.ceil(papers.length / papersPerPage);

  const handleDetails = (paperId) => {
    navigate(`/admin/paper-details/${paperId}`);
  };

  const handleDelete = async (paperId, index) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/submit/delete-paper`,
          { data: { paperId } }
        );
        setPapers((prevPapers) => prevPapers.filter((paper, i) => i !== index));
        Swal.fire("Deleted!", "The paper has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting paper:", error);
        setError("Failed to delete the paper. Please try again.");
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="paper-list">
      <h1 className="all-paper-title">All Papers</h1>
      <ul>
        {currentPapers.map((paper, index) => (
          <li key={paper._id} className="paper-item">
            <span>Paper ID: {paper.paperID}</span>
            <h2>{paper.title}</h2>
            
            <button
              className="details-button"
              onClick={() => handleDetails(paper._id)}
            >
              Details
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(paper._id, index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaperList;
