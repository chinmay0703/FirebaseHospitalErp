import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import { useNavigate, Link } from "react-router-dom";
import { db } from "./firebase";

function EditPatient() {
    const [patientData, setPatientData] = useState({
        id: "",
        name: "",
        lastname: "",
        address: "",
        mobile: "",
        patientPackage: "",
        date: "",
    });

    const [packages, setPackages] = useState([]); // State to hold the list of packages
    const navigate = useNavigate();
    const activeItem = "EditPatient";

    useEffect(() => {
        // Fetch the patient data based on the patient ID from Firebase Firestore
        const patientId = localStorage.getItem("PatientId");
        const patientRef = db.collection("patients").doc(patientId);

        patientRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    setPatientData({
                        id: patientId,
                        ...data,
                    });
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.error("Error fetching patient:", error);
            });

        // Fetch the list of packages from Firebase Firestore
        const packagesRef = db.collection("packages");

        packagesRef
            .get()
            .then((querySnapshot) => {
                const packagesData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPackages(packagesData);
            })
            .catch((error) => {
                console.error("Error fetching packages:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientData({
            ...patientData,
            [name]: value,
        });
    };

    const handleUpdate = () => {
        navigate("/AllPatients"); // Redirect to the patient list page after updating
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update the patient data in Firebase Firestore
        try {
            const patientRef = db.collection("patients").doc(patientData.id);
            await patientRef.update({
                name: patientData.name,
                lastname: patientData.lastname,
                address: patientData.address,
                mobile: patientData.mobile,
                patientPackage: patientData.patientPackage,
                date: patientData.date,
            });

            console.log("Patient data successfully updated!");

            // After a successful update, navigate to the patient list page
            handleUpdate();
        } catch (error) {
            console.error("Error updating patient data:", error);
        }
    };

    return (
        <div className="App">
            <Navbar activeItem={activeItem} />
            <div className="patient-form-container my-3">
                <form className="patient-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="hidden"
                            id="id"
                            name="id"
                            value={patientData.id}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="name">First Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={patientData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={patientData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={patientData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile No</label>
                        <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            value={patientData.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="patientPackageSelect">Select Package</label>
                        <select
                            id="patientPackageSelect"
                            name="patientPackage"
                            value={patientData.patientPackage}
                            onChange={handleChange}
                        >
                            {packages.map((packageItem) => (
                                <option key={packageItem.id} value={packageItem.id}>
                                    {`${packageItem.timeperiod}, joint=${packageItem.joint}, TotalAmount=${packageItem.amount}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={patientData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="btn btn-primary" type="submit">
                        Update
                    </button>
                    <Link to="/AllPatients">
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

export default EditPatient;
