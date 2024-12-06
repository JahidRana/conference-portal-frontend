import React, { useState, useEffect } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import versityOne from "../../../asset/images/versity_img11.jpg";
import versityTwo from "../../../asset/images/versity_img12.jpg";
import versityThree from "../../../asset/images/versity_img13.jpg";
import "./Carousel.css";

const Carousel = () => {
  const [date, setDate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/get-date`
        );
        setDate(response.data);
      } catch (error) {
        console.error("Error fetching date data", error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error loading data!</div>;
  }

  if (!date) {
    return <div>Loading...</div>;
  }

  return (
    <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
      {/* Title */}
      <div className="carousel-title">
  <span className="text-background">
    International Conference on Emerging Technologies for Sustainable Development (ICETSD 2024)
  </span>
</div>

      <div className="carousel-inner forOverlay">
        <div className="carousel-item active" data-bs-interval="4000">
          <img
            src={versityOne}
            style={{
              height: "500px",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="d-block w-100"
            alt="Conference Background"
          />
          <div className="carousel-caption d-none d-md-block fw-bold text-light">
            <p className="px-5 py-3 text-start">
              <h6>
                <strong>Paper Submission Deadline: </strong>
                <strong className="text-info">{date.data[0].PaperSubmissionDeadline}</strong>
              </h6>
              <h6>
                <strong>Acceptance Notification: </strong>
                <strong className="text-info">{date.data[0].AcceptanceNotification}</strong>
              </h6>
              <h6>
                <strong>Registration Deadline: </strong>
                <strong className="text-info">{date.data[0].RegistrationDeadline}</strong>
              </h6>
              <h6>
                <strong>Conference Dates: </strong>
                <strong className="text-info">
                  {date.data[0].ConferenceStartDate} to {date.data[0].ConferenceEndDate}
                </strong>
              </h6>
              <h6>
                <strong>Conference Venue: </strong>
                <span className="venu text-info">
                  Jashore University of Science and Technology Campus, Bangladesh
                </span>
              </h6>
              <h3 className="text-center">
                <button
                  type="button"
                  className="btn btn-outline-secondary my-3 text-white m-auto"
                  onClick={() =>
                    window.open(
                      "https://asset.cloudinary.com/dlpsf2ilp/348cda2ffb63295f788e26cba79f4873",
                      "_blank"
                    )
                  }
                >
                  Call For Paper
                </button>
              </h3>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
