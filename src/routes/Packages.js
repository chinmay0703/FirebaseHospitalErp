import { toast } from 'react-toastify';
import Navbar from "../components/Navbar";
import "../routes/Home.css";
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { db } from "./firebase";
import "./Packages.css";
function Packages() {
    const [packages, setPackages] = useState([]);
    const navigate = useNavigate();
    const activeItem = "Packages";
    const setActiveItem = (itemName) => {
        console.log(`Setting active item to ${itemName}`);
    };
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const packagesCollection = await db.collection("packages").get();
                const packagesData = packagesCollection.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPackages(packagesData);
            } catch (error) {
                console.error("Error fetching packages:", error);
            }
        };
        fetchPackages();
    }, []);
    const handleDelete = (id) => {
        db.collection("packages")
            .doc(id)
            .delete()
            .then(() => {
                const updatedPackages = packages.filter((pkg) => pkg.id !== id);
                setPackages(updatedPackages);
                toast.success("Package deleted successfully");
            })
            .catch((error) => {
                console.error("Error deleting package:", error);
                toast.error("An error occurred while deleting the package");
            });
    };
    
    const handleEdit = (id) => {
        localStorage.setItem("PackageId", id);
        navigate("/editpackage");
    };
    return (
        <div className="App">
            <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
            <Link to="/form">
                <button className="btn btn-secondary my-3">Add Package</button>
            </Link>
            <div className="container">
                <h2>Package List</h2>
                <div className="table-container table-scrollable">
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th>Time</th>
                            <th>Joint</th>
                            <th>Amount</th>
                            <th>Session</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map((pkg) => (
                            <tr key={pkg.id}>
                                <td>{pkg.timeperiod}</td>
                                <td>{pkg.joint}</td>
                                <td>{pkg.amount}</td>
                                <td>{pkg.persessioncharges}</td>
                                <td>
                                    <button className="btn btn-danger my-1" onClick={() => handleDelete(pkg.id)}>
                                        Delete
                                    </button>
                                    <button className="btn btn-info my-1 mx-1" onClick={() => handleEdit(pkg.id)}>
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Packages;
