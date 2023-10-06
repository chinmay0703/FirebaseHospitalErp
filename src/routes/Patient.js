import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import { db } from "./firebase";

function Patient() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    address: "",
    patientPackage: "", 
    date: getCurrentDate(),
    mobile: "",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

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

  useEffect(() => {
    // Fetch packages from Firebase Firestore
    const fetchPackages = async () => {
      try {
        const packagesCollection = await db.collection("packages").get();
        const packagesData = packagesCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        setPackages(packagesData);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.mobile.length !== 10 || !/^\d+$/.test(formData.mobile)) {
      toast.error("Please enter a 10-digit mobile number");
      return;
    }
    db.collection("patients")
      .add({
        name: formData.name,
        lastname: formData.lastname,
        address: formData.address,
        patientPackage: formData.patientPackage,
        date: formData.date,
        mobile: formData.mobile,
      })
      .then((docRef) => {
        console.log("Patient added with ID: ", docRef.id);
        toast.success("Patient Added");
        navigate("/AllPatients");

        setFormData({
          name: "",
          lastname: "",
          address: "",
          patientPackage: "",
          date: getCurrentDate(),
          mobile: "",
        });
      })
      .catch((error) => {
        console.error("Error adding patient: ", error);
      });
  };

  const activeItem = "Patient";
  const setActiveItem = (itemName) => {
    console.log(`Setting active item to ${itemName}`);
  };

  const [packages, setPackages] = useState([]);

  return (
    <div className="App">
      <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
      <h2 className="my-2">Patient Information</h2>
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
            <label htmlFor="patientPackage">Select Package</label>
            <select
              id="patientPackage"
              name="patientPackage"
              value={formData.patientPackage} 
              onChange={handleChange}
            >
              <option value="">Select a Package</option> 
              {packages.map((packageItem) => (
                <option
                  key={packageItem.id}
                  value={packageItem.id} 
                >
                  {`${packageItem.timeperiod}, joint=${packageItem.joint}, TotalAmount=${packageItem.amount}`}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile No</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={{ marginLeft:0}}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Patient;
