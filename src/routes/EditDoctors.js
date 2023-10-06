import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import { db } from "./firebase"; // Import your Firebase db instance
import "./Patient.css"; // Import the same CSS file
import { toast } from 'react-toastify';

function EditDoctors() {
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        age: "",
        date: "",
        adharcard: "", // Added "Adhar Card" field
        mobileno: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const doctorId = localStorage.getItem("DoctorId");

        // Fetch doctor data from Firebase Firestore
        const fetchDoctorData = async () => {
            try {
                const doctorRef = db.collection("doctors").doc(doctorId);
                const doctorData = await doctorRef.get();
                if (doctorData.exists) {
                    const data = doctorData.data();
                    setFormData({
                        name: data.name,
                        lastname: data.lastname,
                        age: data.age,
                        date: data.date,
                        adharcard: data.adharcard,
                        mobileno: data.mobileno,
                    });
                } else {
                    console.error("Doctor not found in Firestore.");
                }
            } catch (error) {
                console.error("Error fetching doctor details:", error);
            }
        };

        fetchDoctorData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const doctorId = localStorage.getItem("DoctorId");

        // Update doctor data in Firebase Firestore
        db.collection("doctors")
            .doc(doctorId)
            .update(formData)
            .then(() => {
                console.log("Doctor data updated successfully");
                toast.success("Doctor Updated");
                navigate("/AllDoctors");
            })
            .catch((error) => {
                console.error("Error updating doctor data:", error);
            });
    };

    const activeItem = "AllDoctors";

    const setActiveItem = (itemName) => {
        console.log(`Setting active item to ${itemName}`);
    };

    return (
        <div className="App">
            <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
            <h2 className="my-2">Edit Doctor Information</h2>
            <div className="patient-form-container my-3">
                <form className="patient-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">First Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
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
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="text"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="adharcard">Adhar Card</label>
                        <input
                            type="text"
                            id="adharcard"
                            name="adharcard"
                            value={formData.adharcard}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobileno">Mobile Number</label>
                        <input
                            type="text"
                            id="mobileno"
                            name="mobileno"
                            value={formData.mobileno}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Joining Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            style={{ marginLeft: 0 }}
                        />
                    </div>
                    <button type="submit" method="post">Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default EditDoctors;
