import { Link, Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import './trac.css';
import HomeNavBar from "../Shared/HomeNavBar/HomeNavBar";



const TractRoot = () => {

    return (

        <div>
            <HomeNavBar />
            <div className="d-flex">
                
                <div className="SidebarContainer">
                    <div className="">
                        <div class="dropdown px-2 my-3">
                            <i className='bi bi-person-plus'></i>
                            <span
                                class="dropdown-toggle ms-3 p-2"
                                id="dropdownMenuButton"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Manage User
                            </span>
                            <ul class="dropdown-menu " aria-labelledby="dropdownMenuButton">
                                <li>
                                    <Link class="dropdown-item" to="tract-chair/manage-paper">Manage Paper</Link>
                                </li>
                                <li>
                                    <Link class="dropdown-item" to="tract-chair/manage-admin">Manage Admin</Link>
                                </li>
                                <li>
                                    <Link class="dropdown-item" to="/tract-chair/manage-reviewer">Manage Reviewer</Link>
                                </li>
                                {/* <li>
                                    <Link class="dropdown-item" to="/tract-chair/manage-committee">Manage Committee</Link>
                                </li> */}
                            </ul>
                        </div>
                        <div
                            className="px-2 d-flex align-items-center" >
                            <i className='bi bi-person-plus'></i>
                            <span className="m-0 p-2"> <Link to='/tract-chair/add-reviewer' className='sidebar-item plain'>Add Reviewer</Link> </span>
                        </div>

                        <div
                            className="px-2 d-flex align-items-center " >
                            <i className='bi bi-person-plus'></i>
                            <span className="m-0 p-2"> <Link to='/tract-chair/make-admin' className='sidebar-item plain'>Make Admin</Link> </span>
                        </div>
                        

                        <div
                            className="px-2 d-flex align-items-center " >
                            <i className='bi bi-house-door-fill'></i>
                            <span className="m-0 p-2"> <Link to='/' className='sidebar-item plain'>Home</Link> </span>
                        </div>
                    </div>
                </div>
                <div className="Component">
                    <div className="">
                        <Outlet />
                    </div>
                </div>

            </div>
            <Footer />
        </div>


    );
};

export default TractRoot;