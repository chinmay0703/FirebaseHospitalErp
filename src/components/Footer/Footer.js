import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Footer/Footer.css"
import 'boxicons/css/boxicons.min.css';

function Footer() {
    return (
        <div>
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="footer-col col-12 col-md-4">
                            <h4>Timing</h4>
                            <ul>
                                <li>
                                    <a href="https://rebalance-chinmay0703.vercel.app/">
                                        Monday to Saturday<br />
                                        Morning - 9:30 to 12:30<br />
                                        Evening - 5:30 to 8:30
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-col col-12 col-md-4">
                            <h4>Address</h4>
                            <ul>
                                <li>
                                    <a href="https://rebalance-chinmay0703.vercel.app/">
                                        Physical Therapy Clinic in Bangalore,
                                        610, 2nd floor, AECS Layout - C Block, AECS Layout, Brookefield, Bengaluru, Karnataka 560037
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="footer-col col-12 col-md-4">
                            <h4>Follow Us</h4>
                            <div className="social-links">
                                <a href="https://www.facebook.com/vaishnavi.vyawahare/"><i className="bx bxl-facebook"></i></a>
                                <a href="https://www.linkedin.com/in/vaishnavi-vyawahare-5a67761ba/?originalSubdomain=in"><i className="bx bxl-linkedin"></i></a>
                                <a><i className="bx bxl-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;
