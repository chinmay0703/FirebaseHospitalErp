import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import { useNavigate, Link } from "react-router-dom";
import { db } from "./firebase";

function EditPackage() {
    const [packageData, setPackageData] = useState({
        id: "",
        timeperiod: "",
        amount: "",
        persessioncharges: "",
        joint: "",
    });

    const navigate = useNavigate();
    const activeItem = "EditPackage";

    useEffect(() => {
        // Fetch the package data based on the package ID from Firebase Firestore
        const packageId = localStorage.getItem("PackageId");
        const packageRef = db.collection("packages").doc(packageId);

        packageRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    setPackageData({
                        id: packageId,
                        ...data,
                    });
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.error("Error fetching package:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPackageData({
            ...packageData,
            [name]: value,
        });
    };

    const handleUpdate = () => {
        navigate("/packages"); // Redirect to the package list page after updating
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update the package data in Firebase Firestore
        try {
            const packageRef = db.collection("packages").doc(packageData.id);
            await packageRef.update({
                timeperiod: packageData.timeperiod,
                amount: packageData.amount,
                persessioncharges: packageData.persessioncharges,
                joint: packageData.joint,
            });

            console.log("Package data successfully updated!");

            // After successful update, navigate to the package list page
            handleUpdate();
        } catch (error) {
            console.error("Error updating package data:", error);
        }
    };

    return (
        <div className="App">
            <Navbar activeItem={activeItem} />
            <div className="patient-form-container my-3">
                <form className="patient-form" onSubmit={handleSubmit}>
                    {/* Input fields for editing package data */}
                    {/* You can customize these fields based on your package data structure */}
                    <div className="form-group">
                        <input
                            type="hidden"
                            id="id"
                            name="id"
                            value={packageData.id}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="timeperiod">Time Period</label>
                        <input
                            type="text"
                            id="timeperiod"
                            name="timeperiod"
                            value={packageData.timeperiod}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="joint">Joint</label>
                        <input
                            type="text"
                            id="joint"
                            name="joint"
                            value={packageData.joint}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="text"
                            id="amount"
                            name="amount"
                            value={packageData.amount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="persessioncharges">Per Session charges</label>
                        <input
                            type="text"
                            id="persessioncharges"
                            name="persessioncharges"
                            value={packageData.persessioncharges}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">
                        Update
                    </button>
                    <Link to="/packages">
                        <button className="btn btn-danger mx-2" style={{ backgroundColor: 'rgba(255, 0, 0, 0.7)' }}>
                            Cancel
                        </button>
                    </Link>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default EditPackage;
