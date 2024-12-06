import React, {  useState } from 'react';
import './ShowReviewer.css'
import Modal from './ReviewModal/Modal';
import fakeData from './data.json'
import { useLocation } from 'react-router-dom';

const ShowReview = () => {
  const location = useLocation();
  const { paper } = location.state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(paper.review.reviewInfo);
  const [selectedItem, setSelectedItem] = useState(null);

  // useEffect(() => {
  //   // Fetch the data from data.json
  //   fetch("/data.json") // Use the relative path to the public directory
  //     .then((response) => response.json())
  //     .then((data) => setData(data));
  // }, []);


  console.log('---------------------',paper);
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  return (
    <div id='reviewerReview'>
      <section className="reviewContainer mb-5" >
        <h4 className="text-center"> Reviewed List </h4>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Reviewer_id</th>
              <th scope="col">Name</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {
              data ? data.map((item) => (
                <tr key={item._id}>
                  <th scope="row">{item._id}</th>
                  <td>{paper.review.Reviewer.displayName}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => openModal(item)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              )) : ""
            }
          </tbody>
        </table>
      </section>
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} rowData={selectedItem} />}
    </div>)
};

export default ShowReview;