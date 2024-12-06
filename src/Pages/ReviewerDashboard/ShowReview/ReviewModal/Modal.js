import React from "react";
import './Modal.css';

const Modal = ({ isOpen, onClose, rowData }) => {
  if (!isOpen || !rowData) return null;

  return (
    <div className="modal5" id="">
      <div className="modal-content2">
        <h2>Details</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Property</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rowData).map(([property, value]) => (
              <tr key={property}>
                <td>{property}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
