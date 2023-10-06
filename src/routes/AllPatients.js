import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { db } from "./firebase";
import { toast } from "react-toastify";
function AllPatients() {
  const [patients, setPatients] = useState([]);
  const [packages, setPackages] = useState({});
  const [patientCount, setPatientCount] = useState(0);
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("messages")) || {});
  const [searchInput, setSearchInput] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsCollection = await db.collection("patients").get();
        const patientsData = patientsCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatients(patientsData);
        const count = patientsData.length;
        setPatientCount(count);
        console.log(`Total Patients: ${count}`);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    // Fetch package data from Firebase Firestore
    const fetchPackages = async () => {
      try {
        const packagesCollection = await db.collection("packages").get();
        const packagesData = packagesCollection.docs.reduce((result, doc) => {
          const packageData = doc.data();
          result[doc.id] = packageData;
          return result;
        }, {});
        setPackages(packagesData);
        console.log("Packages Data:", packagesData);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPatients();
    fetchPackages();
  }, []);

  useEffect(() => {
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [patients, searchInput]);

  const handleDelete = (id) => {
    try {
      const updatedPatients = patients.filter((patient) => patient.id !== id);
      setPatients(updatedPatients);
      db.collection("patients")
        .doc(id)
        .delete()
        .then(() => {
          console.log(`Patient with ID ${id} deleted successfully`);
          toast.error("Patient Successfully deleted")
        })
        .catch((error) => {
          console.error(`Error deleting patient with ID ${id}:`, error);
        });
    } catch (error) {
      console.error(`Error deleting patient with ID ${id}:`, error);
    }
  };

  const handleEdit = (id) => {
    localStorage.setItem("PatientId", id);
    navigate("/EditPatients");
  };

  const handleAppoint = (id) => {
    const patientToAppoint = patients.find((patient) => patient.id === id);
  
    if (patientToAppoint) {
      const recipientNumber = `+${patientToAppoint.mobile}`;
        const message = window.prompt("Please enter the appointment message:");
  
      if (message !== null) {
        const fullMessage = `Dear ${patientToAppoint.name}, this is a reminder for your upcoming physiotherapy session at REBALANCE Clinic. ${message}. Please arrive on time. If you have any questions or need to reschedule, please contact us. Thank you!`;
          const encodedMessage = encodeURIComponent(fullMessage);
          const whatsappURL = `https://api.whatsapp.com/send?phone=${recipientNumber}&text=${encodedMessage}`;
  
        window.location.href = whatsappURL;
        const newMessages = {
          ...messages,
          [id]: message, 
        };
        setMessages(newMessages);
        localStorage.setItem("messages", JSON.stringify(newMessages));
      } else {
        console.log("Message not provided.");
      }
    } else {
      console.error(`Patient with ID ${id} not found.`);
    }
  };
  
  
  const activeItem = "AllPatients";
  const setActiveItem = (itemName) => {
    console.log(`Setting active item to ${itemName}`);
  };

  const clearAllBadges = () => {
    setMessages({});
    localStorage.removeItem("messages");
  };

  const handleSearch = () => {
    setSearchInput(searchInput);
  };

  return (
    <div className="App">
      <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="mx-3">
        <div className="patient-list">
          {patientCount === 0 ? (
            <h1 className="my-3">No patients available.</h1>
          ) : (
            <div>
              <h2 className="my-2">Patient List</h2>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                  className="btn btn-primary my-2 mx-1"
                  onClick={handleSearch}
                >
                  Search
                </button>
                <button
                  className="btn btn-secondary my-2 mx-1"
                  onClick={clearAllBadges}
                >
                  Clear
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                  <colgroup>
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "100px" }} />
                  </colgroup>
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Last Name</th>
                      <th>Reg. Date</th>
                      <th>Address</th>
                      <th>Mobile No</th>
                      <th>Package</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id}>
                        <td>{patient.name}</td>
                        <td>{patient.lastname}</td>
                        <td>{new Date(patient.date).toLocaleDateString()}</td>
                        <td>{patient.address}</td>
                        <td>{patient.mobile}</td>
                        <td>
                          {packages[patient.patientPackage]
                            ? `${packages[patient.patientPackage].timeperiod}, joint=${packages[patient.patientPackage].joint}, Amount=${packages[patient.patientPackage].amount}`
                            : "Unknown Package"}
                        </td>
                        <td>
                          <button
                            className="btn btn-warning my-1 position-relative"
                            onClick={() => handleAppoint(patient.id)}
                            style={{ overflow: 'visible' }}
                          >
                            Appoint
                            {messages[patient.id] && (
                              <span
                                className="badge bg-secondary position-absolute top-0 end-0"
                                style={{
                                  transform: 'translate(-5%, -70%)', // Center the badge
                                  fontSize: '0.8rem', // Adjust the font size if needed
                                  padding: '3px 6px', // Adjust padding for badge content
                                  zIndex: 1, // Ensure the badge is on top
                                }}
                              >
                                {messages[patient.id]}
                              </span>
                            )}
                          </button>

                          <button
                            className="btn btn-info mx-1 my-1"
                            onClick={() => handleEdit(patient.id)}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-danger my-1"
                            onClick={() => handleDelete(patient.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllPatients;
