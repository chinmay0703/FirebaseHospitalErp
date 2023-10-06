import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import "./Patient.css";

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { db } from "./firebase"; // Import your Firebase db instance

function Doctor() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    address: "",
    age: "",
    adharcard: "",
    mobileno: "",
    date: getCurrentDate(),
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for Aadhar Card
    if (name === "adharcard") {
      const regex = /^[0-9]{0,12}$/; // Allow only up to 12 digits
      if (!regex.test(value)) {
        toast.error("Invalid Aadhar Card Number");
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save doctor's information to Firebase
    db.collection("doctors")
      .add(formData)
      .then((docRef) => {
        console.log("Doctor added with ID: ", docRef.id);
        toast.success("Doctor Added");
        navigate("/Enrollment");

        // Clear the form data
        setFormData({
          name: "",
          lastname: "",
          address: "",
          age: "",
          adharcard: "",
          mobileno: "",
        });
      })
      .catch((error) => {
        console.error("Error adding doctor: ", error);
      });
  };

  const activeItem = "Doctor"; // Update the active item in the Navbar
  const setActiveItem = (itemName) => {
    console.log(`Setting active item to ${itemName}`);
  };

  return (
    <div className="App">
      <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
      <h2 className="my-2">Doctor Information</h2>
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
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
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
      <Footer></Footer>
    </div>
  );
}

export default Doctor;
