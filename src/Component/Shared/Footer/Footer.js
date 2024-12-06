import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { RiFacebookCircleLine } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { AiFillTwitterCircle } from "react-icons/ai";
import "./Footer.css";

function Footer() {
  return (
    <div className="main-footer bg-light">
      <div className="container">
        {/* <table className="table">
          <>
            <tr>
              <th scope="col" className="name">Md Kamrul Islam</th>
              <th scope="col">Important Links</th>
              <th scope="col">Services Links</th>
            </tr>
            <tr>
              <td><hr /></td> 
              <td><hr /></td> 
              <td><hr /></td> 
            </tr>
          </>
          <>
            <tr>
              <td>
                <ul className="list-unstyled">
                  <li className="text-bold">Associate Professor</li>
                  <li> <BsTelephone />342-420-6969</li>
                  <li><AiOutlineMail /> mk.islam@just.edu.bd </li>
                </ul>
              </td>
              <td>
                <ul className="list-unstyled">
                  <li><a href="facebook.com"><RiFacebookCircleLine /> Facebook</a></li>
                  <li><a href="fixoriya.com"><CgWebsite/>Website Link</a></li>
                  <li><a href="youtube.com"><AiFillTwitterCircle />Twitter</a></li>
                </ul>
              </td>
              <td>
                <ul className="list-unstyled">
                  <li><Link to="/services">Call for paper</Link></li>
                  <Link to="/review">Review</Link>

                </ul>
              </td>
            </tr>
          </>
        </table> */}
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Faculty of Engineering and Technology,Jashore University of Science and Technology.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;