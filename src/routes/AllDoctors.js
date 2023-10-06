import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase"; // Import your Firebase db instance
import "./AllDoctors.css"
function AllDoctors() {
    const [doctors, setDoctors] = useState([]);
    const activeItem = "AllDoctors";
    const navigate = useNavigate();

    const setActiveItem = (itemName) => {
        console.log(`Setting active item to ${itemName}`);
    };

    useEffect(() => {
        // Fetch doctors data from Firebase Firestore
        const fetchDoctors = async () => {
            try {
                const doctorsCollection = await db.collection("doctors").get();
                const doctorsData = doctorsCollection.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setDoctors(doctorsData);
            } catch (error) {
                console.error("Error fetching doctors data:", error);
            }
        };

        fetchDoctors();
    }, []);

    const handleDelete = async (id) => {
        try {
          // 1. Remove the doctor from the local state (assuming 'doctors' is a state variable)
          const updatedPatients = doctors.filter((doctor) => doctor.id !== id);
          setDoctors(updatedPatients);
      
          // 2. Delete the doctor document from Firestore
          await db.collection("doctors").doc(id).delete();
      
          // 3. Display a success message
          console.log(`Doctor with ID ${id} deleted successfully`);
          toast.error("Doctor successfully deleted");
        } catch (error) {
          // 4. Handle any errors that may occur during the deletion process
          console.error(`Error deleting Doctor with ID ${id}:`, error);
          toast.error("Error deleting doctor");
        }
      };
      
    const handleEdit = (id) => {
        localStorage.setItem("DoctorId", id);
        navigate("/EditDoctors");
    };
    

    return (
        <div className="App">
            <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
            <div className="container">
                <div className="Doctor-list">
                    <h2 className="my-3">Doctor List</h2>
                    <div className="table-container table-scrollable">
                        <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Join Date</th>
                                    <th>Mobile No</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors.map((doctor) => (
                                    <tr key={doctor.id}>
                                        <td>{doctor.name}</td>
                                        <td>{doctor.lastname}</td>
                                        <td>{doctor.age}</td>
                                        <td>{new Date(doctor.date).toLocaleDateString()}</td>
                                        <td>{doctor.mobileno}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger my-1"
                                                onClick={() => handleDelete(doctor.id)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="btn btn-info mx-3 my-1"
                                                onClick={() => handleEdit(doctor.id)}
                                            >
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AllDoctors;
