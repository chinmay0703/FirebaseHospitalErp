import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Navbar.css";
import 'boxicons/css/boxicons.min.css';
import "bootstrap";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import pic from "../Images/yttttttttttttttt.jpg"
function Navbar(props) {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('UserId');
        localStorage.removeItem('UserName');
        localStorage.removeItem('DoctorId');
        localStorage.removeItem('PatientId');
        localStorage.removeItem('PackageId');
        navigate("/")
        toast.error("Loged out Successfully");
    };
    const authToken = localStorage.getItem('authToken');
    const user = localStorage.getItem('UserName');
    const { activeItem, setActiveItem } = props;
    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };
    const [sidebarActive, setSidebarActive] = useState(false);
    const handleSidebarToggle = () => {
        setSidebarActive(!sidebarActive);
    };
    const handleSidebarCollapseX = () => {
        setSidebarActive(false);
    };
    return (
        <div>
            <div className={`overlay ${sidebarActive ? 'visible' : ''}`}></div>
            <nav className="navbar navbar-expand-md navbar-light bg-light main-menu" style={{ boxShadow: 'black' }}>
                <div className="container">
                    <Button
                        type="button"
                        id="sidebarCollapse"
                        variant="link"
                        className="btn btn-link d-block d-md-none"
                        onClick={handleSidebarToggle}
                    >
                        <i className={`bx ${sidebarActive ? 'bx-x' : 'bx-menu'} icon-single`}></i>
                    </Button>
                    <Link className="navbar-brand" to="/">
                        <h4 className="font-weight-bold">
                            <img style={{ width: '25px' }} src={pic} alt="Logo" /> Rebalance
                        </h4>
                    </Link>
                    <nav className="navbar navbar-expand-md navbar-light bg-light sub-menu">
                        <div className="container">
                            <div className="collapse navbar-collapse" id="navbar">
                                <ul className="navbar-nav mx-auto">
                                    {authToken ? (
                                        <li className={`nav-item ${activeItem === 'DashboardDetails' ? 'active' : ''}`}>
                                            <Link className="nav-link" to="/DashboardDetails" onClick={() => handleItemClick('DashboardDetails')}>
                                                Dashboard
                                            </Link>
                                        </li>
                                    ) : (
                                        <li className={`nav-item ${activeItem === 'Home' ? 'active' : ''}`}>
                                            <Link className="nav-link" to="/" onClick={() => handleItemClick('Home')}>
                                                Home
                                            </Link>
                                        </li>
                                    )}


                                    {authToken && (
                                        <>
                                            <li className={`nav-item ${activeItem === 'Enrollment' ? 'active' : ''}`}>
                                                <Link to="/Enrollment" className="nav-link" onClick={() => handleItemClick('Enrollment')}>
                                                    Enrollment
                                                </Link>
                                            </li>
                                            <li className={`nav-item ${activeItem === 'Packages' ? 'active' : ''}`}>
                                                <Link to="/Packages" className="nav-link" onClick={() => handleItemClick('Packages')}>
                                                    Packages
                                                </Link>
                                            </li>

                                            <div className="dropdown">
                                                <a className="btn dropdown-toggle my-2" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                    List
                                                </a>

                                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <li className={`nav-item ${activeItem === 'AllPatients' ? 'active' : ''}`}>
                                                        <Link to="/AllPatients" className="nav-link" onClick={() => handleItemClick('AllPatients')}>
                                                            Patient List
                                                        </Link>
                                                    </li>
                                                    <li className={`nav-item ${activeItem === 'AllDoctors' ? 'active' : ''}`}>
                                                        <Link to="/AllDoctors" className="nav-link" onClick={() => handleItemClick('AllDoctors')}>
                                                            Doctor List
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>


                                        </>
                                    )}

                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className="collapse navbar-collapse justify-content-end">

                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                <h5 className="my-2">{user}</h5>
                            </li>

                            <li className="nav-item ml-md-3">
                                {authToken ? (

                                    <button className="btn btn-danger mx-3" onClick={handleLogout}>

                                        <i className="bx bxs-user-circle mr-1 "></i> Log Out
                                    </button>
                                ) : (
                                    <Link className="btn btn-primary" to="/login">
                                        <i className="bx bxs-user-circle mr-1"></i> Log In
                                    </Link>
                                )}
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>



            <div className="search-bar d-block d-md-none">
                <div className="container">
                    <div className="row">
                        <div className="col-12">

                        </div>
                    </div>
                </div>
            </div>

            <nav id="sidebar" className={sidebarActive ? 'active' : ''}>
                <div className="sidebar-header">
                    <div className="container">
                        <div className="row align-items-left">


                            <div className="col-4 text-left">
                                <button type="button" id="sidebarCollapseX" className="btn btn-link" onClick={handleSidebarCollapseX}>
                                    <i className="bx bx-x icon-single"></i>
                                </button>
                            </div>




                        </div>
                    </div>
                </div>


                <ul className="list-unstyled components links mb-3">
                    <li className={`${activeItem === 'Home' ? 'active' : ''}`}>
                        <Link to="/" onClick={() => handleItemClick('Home')}>
                            Home
                        </Link>
                    </li>



                    {authToken && (
                        <>
                            <li className={`nav-item ${activeItem === 'Enrollment' ? 'active' : ''}`}>
                                <Link to="/Enrollment" className="nav-link" onClick={() => handleItemClick('Enrollment')}>
                                    Enrollment
                                </Link>
                            </li>
                            <li className={`nav-item ${activeItem === 'Packages' ? 'active' : ''}`}>
                                <Link to="/Packages" className="nav-link" onClick={() => handleItemClick('Packages')}>
                                    Packages
                                </Link>
                            </li>
                            <li className={`nav-item ${activeItem === 'AllPatients' ? 'active' : ''}`}>
                                <Link to="/AllPatients" className="nav-link" onClick={() => handleItemClick('AllPatients')}>
                                    Patient List
                                </Link>
                            </li>
                            <li className={`nav-item ${activeItem === 'AllDoctors' ? 'active' : ''}`}>
                                <Link to="/AllDoctors" className="nav-link" onClick={() => handleItemClick('AllDoctors')}>
                                    Doctor List
                                </Link>
                            </li>
                            <li className={`nav-item ${activeItem === 'DashboardDetails' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/DashboardDetails" onClick={() => handleItemClick('DashboardDetails')}>
                                    Dashboard
                                </Link>
                            </li>


                        </>
                    )}
                    <li className={` ${activeItem === 'Login' ? 'active' : ''}`}>
                        {authToken ? (
                            <Link to="/" onClick={() => handleLogout('Log out')}>
                                Log out
                            </Link>

                        ) : (
                            <Link to="/login" onClick={() => handleItemClick('log in')}>
                                Log In
                            </Link>
                        )}
                    </li>

                </ul>
                <ul className="social-icons">
                    <li><a href="/f" target="_blank" title="d"><i className="bx bxl-facebook-square"></i></a></li>
                    <li><a href="/j" target="_blank" title="d"><i className="bx bxl-twitter"></i></a></li>
                    <li><a href="/d" target="_blank" title="d"><i className="bx bxl-linkedin"></i></a></li>
                    <li><a href="/f" target="_blank" title="d"><i className="bx bxl-instagram"></i></a></li>
                </ul>

            </nav>

        </div>
    )
}

export default Navbar;
