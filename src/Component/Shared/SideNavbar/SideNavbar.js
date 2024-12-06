import SideBarMain from "./SideBarMain";
import items from "../../../asset/FakeData/SideNavbar.json";
import { Link } from "react-router-dom";

export default function SideNavbar() {
  return (
    <div className="sidebar">
      <section>
        <div className="dropdown px-2 my-3">
          <i className='bi bi-person-plus ms-2'></i>
          <span
            className="dropdown-toggle ms-1 p-2"
            id="dropdownMenuButton"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            Customize Page
          </span>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <Link className="dropdown-item" to="/admin/manage-committee">Add Committee</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/update-committee">Update Committee</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/remove-committee">Remove Committee</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/speaker">Add Speaker</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/remove/speaker">Remove Speaker</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/customize-homepage">Customize HomePage</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/customize-date">Customize Date</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/customize-submission">Customize Submission</Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Existing items from the JSON data */}
      {items.map((item, index) => (
        <SideBarMain key={index} item={item} />
      ))}

      {/* New Registration Menu (placed under Submit Paper) */}
      <section>
        <div className="dropdown px-2 my-3">
          <i className='bi bi-person-plus ms-2'></i>
          <span
            className="dropdown-toggle ms-1 p-2"
            id="dropdownRegistrationMenuButton"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            Registration
          </span>
          <ul className="dropdown-menu" aria-labelledby="dropdownRegistrationMenuButton">
            <li>
              <Link className="dropdown-item" to="/admin/registration-fees">Registration Fees</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/registration-process">Registration Process</Link>
            </li>
          </ul>
        </div>
      </section>

   {/* New Reviewer Menu */}
   <section>
  <div className="dropdown px-2 my-3">
  <i className='bi bi-person-check ms-2'></i>
    <span
      className="dropdown-toggle ms-1 p-2"
      id="dropdownRegistrationMenuButton"
      data-mdb-toggle="dropdown"
      aria-expanded="false"
    >
      Reviewer Info
    </span>
    <ul className="dropdown-menu" aria-labelledby="dropdownRegistrationMenuButton">
    <li>
        <Link className="dropdown-item" to="/admin/add-reviewer-manually">
          {/* <i className='bi bi-check-circle me-2'></i> */}
          Add User Manually
        </Link>
      </li>
      <li>
        <Link className="dropdown-item" to="/admin/accept-reviewer">
          {/* <i className='bi bi-check-circle me-2'></i> */}
          Pending Reviewer
        </Link>
      </li>
      <li>
        <Link className="dropdown-item" to="/admin/request-reviewer">
          {/* <i className='bi bi-file-earmark-person me-2'></i> */}
          Requested Reviewer
        </Link>
      </li>
      <li>
        <Link className="dropdown-item" to="/admin/reviewer-list">
          {/* <i className='bi bi-file-earmark-person me-2'></i> */}
          Users List
        </Link>
      </li>
    </ul>
  </div>
</section>

{/* side bar for venue menu */}
<section>
        <div className="dropdown px-2 my-3">
          <i className='bi bi-person-plus ms-2'></i>
          <span
            className="dropdown-toggle ms-1 p-2"
            id="dropdownMenuButton"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            Venue
          </span>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <Link className="dropdown-item" to="/admin/add-venue">Add Venue Details</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/remove-venue">Venue Details Remove</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/add-accomodation">Add Accomodations</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/remove-accomodation">Remove Accomodations</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/add-tourist">Add Tourist Place</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/remove-tourist">Remove Tourist Place</Link>
            </li>
       
         
          
          </ul>
        </div>
      </section>
{/* Section for paper menu */}
<section>
        <div className="dropdown px-2 my-3">
        <i className="bi bi-file-earmark-text ms-2"></i>
          <span
            className="dropdown-toggle ms-1 p-2"
            id="dropdownMenuButton"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            Paper
          </span>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">

            <li>
              <Link className="dropdown-item" to="/admin/customize-submission-domain">Customize Domain</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/customize-paper">Customize Paper</Link>
            </li>
       
         
          
          </ul>
        </div>
</section>

{/* Section for pre-schedule */}

<section>
        <div className="dropdown px-2 my-3">
          <i className='bi bi-person-plus ms-2'></i>
          <span
            className="dropdown-toggle ms-1 p-2"
            id="dropdownMenuButton"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            Pre-Schedule
          </span>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <Link className="dropdown-item" to="/admin/add-schedule">Add Schedule</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/remove-schedule">Remove Schedule</Link>
            </li>
          </ul>
        </div>
      </section>

    </div>
  );
}
