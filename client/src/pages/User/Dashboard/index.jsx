import './dashboard.css';

//import UserLayout from '../../../components/UserLayout';

//import { useNavigate } from 'react-router-dom';

import axios from '../../../utils/axios';

import { useState , useEffect } from 'react';

import { getId } from '../../../utils';

const Dashboard = () => {

    const [profiledata, setProfiledata] = useState({});

    const [departments, setDepartments] = useState([]);

    const [locations, setLocations] = useState([])

    const [bookedSlots, setBookedSlots] = useState([]);


    const [searchParams, setSearchParams] = useState({
        location: "",
        department: "",
        date: ""
    });

    const [availableSlots, setAvailableSlots] = useState([]);

    const getProfileDetails = async () => {
        try {
            const dbResponse = await axios.get(`/user/${getId()}`);
            console.log(dbResponse);
            setProfiledata(dbResponse.data);
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    useEffect(() => {
        getProfileDetails();
    }, []);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('/department'); // Fetch department data
                setDepartments(response.data); // Update state with fetched data
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDepartments(); // Call the function to fetch data
    }, []);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('/location'); // Fetch department data
                setLocations(response.data); // Update state with fetched data
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchLocations(); // Call the function to fetch data
    }, []);

    useEffect(() => {
        const fetchBookedSlots  = async () => {
            try {
                const response = await axios.get(`/appointment/user/${getId()}`);
                setBookedSlots(response.data.appointments); 
            } catch (error) {
                console.error("Error fetching booked slots:", error);
            }
        };

        fetchBookedSlots (); // Call the function to fetch data
    }, []);

    
    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({
            ...prev,
            [name]: value  // This will store the ID, not the name
        }));
    };
    // Fetch available slots whenever search parameters change
    useEffect(() => {
        if (searchParams.location && searchParams.department && searchParams.date) {
            fetchAvailableSlots();
        }
    }, [searchParams]);

    const fetchAvailableSlots = async () => {
        console.log("Searching with params:", searchParams); // Debugging log
        try {
            const response = await axios.get('/slots/get-available-slots', { params: searchParams });
            console.log("API Response:", response.data);
            setAvailableSlots(response.data);
        } catch (error) {
            console.error("Error fetching available slots:", error);
        }
    };


    

    const bookSlot = async (slotId) => {
        try {
            const userId = getId(); // Replace with actual logged-in user ID from auth state
    
            const response = await axios.post('/appointment/book-slot', { slotId, userId });
    
            if (response.data.success) {
                alert("Slot booked successfully!");
                fetchAvailableSlots(); // Refresh slots after booking
            } else {
                alert("Booking failed: " + response.data.message);
            }
        } catch (error) {
            console.error("Error booking slot:", error);
            alert("An error occurred while booking the slot.");
        }
    };

    


    return (
        <>


            <header>
                <h1>Doctor Booking Dashboard</h1>
                <div className="profile">
                {/* <img src="profile.jpg" alt="User Profile"/> */}
                <span>Welcome, {profiledata.firstname} {profiledata.lastname}</span>
                </div>
            </header>
            <div className="parallax-banner">
                <h1>Find the Right Doctor Anytime</h1>
            </div>
            <div className="search-section">
                <h2>Search for Doctors</h2>
                <form onSubmit={(e) => e.preventDefault()}>

                <select name="location" value={searchParams.location} onChange={handleInputChange} required>
                    <option value="">Select Location</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location._id}>  {/* ✅ Store ID as value */}
                            {location.name}  {/* Display name */}
                        </option>
                    ))}
                </select>

                <select name="department" value={searchParams.department} onChange={handleInputChange} required>
                    <option value="">Select Department</option>
                    {departments.map((department) => (
                        <option key={department.deptid} value={department._id}>  {/* ✅ Store ID as value */}
                            {department.name}  {/* Display name */}
                        </option>
                    ))}
                </select>
                    <input type="date" name="date" placeholder="Select Date"  onChange={handleInputChange} />
                    <button type="submit">Search</button>
                </form>
            </div>

            <div className="main-content">
                <div className="card">
                <h2>Available Appointments</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Doctor</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Book</th>
                    </tr>
                    </thead>
                    <tbody>
                        {availableSlots.length > 0 ? (
                            availableSlots.map((slot) => (
                                <tr key={slot._id}>
                                    <td>{new Date(slot.date).toISOString().split("T")[0]}</td> {/* Format Date */}
                                    <td>{slot.doctor.firstname} {slot.doctor.lastname}</td>   {/* Doctor Name */}
                                    <td>{slot.doctor.department?.name || "N/A"}</td> {/* Department Name */}
                                    <td>{slot.booked ? "Confirmed" : "Available"}</td> {/* Status */}
                                    <td>
                                        {!slot.booked && ( // Show button only if slot is not booked
                                            <button 
                                                onClick={() => bookSlot(slot._id)}
                                                style={{ backgroundColor: "green", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}
                                            >
                                                Book Slot
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center", padding: "10px", fontWeight: "bold" }}>
                                    No available slots at the moment
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>

                {/* Booked Slots Table */}
                <div className="card">
                    <h2>Your Booked Appointments</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Slot</th>
                                <th>Doctor</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Prescription</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookedSlots.length > 0 ? (
                                bookedSlots.map((appointments) => (
                                    <tr key={appointments._id}>
                                        <td>{new Date(appointments.date).toISOString().split("T")[0]}</td>
                                        <td>{appointments.timeslot}</td>
                                        <td>{appointments.doctor.firstname} {appointments.doctor.lastname}</td>
                                        <td>{appointments.department?.name || "N/A"}</td>
                                        <td>Confirmed</td>
                                        <td>
                                        <td>
                                            {appointments.prescription && appointments.prescription.length > 0 ? (
                                                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                                                    {appointments.prescription.map((item, index) => (
                                                        <li key={index}>{item}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                "No Prescription"
                                            )}
                                        </td> 
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center", padding: "10px", fontWeight: "bold" }}>
                                        No booked appointments yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
            </div>
            <footer>
                © 2024 Doctor Booking. All rights reserved.
            </footer>
        </>
    )
}

export default Dashboard