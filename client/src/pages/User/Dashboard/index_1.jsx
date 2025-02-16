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


    //const navigate = useNavigate();
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
                
    //             const deptResponse = async () => {
    //                 const dbResponse = await axios.get('/department');
    //                 console.log(dbResponse.data);
    //             };

    //             console.log(deptResponse);
    //            // const doctorResponse = await axios.get('http://localhost:3000/doctor');
    //             //const hospitalResponse = await axios.get('http://localhost:3000/hospital');
    //             //console.log(deptResponse);
    //             // setDashboardCount({
    //             //     deptCount: deptResponse.data.length,
    //             //     doctorCount: doctorResponse.data.length,
    //             //     hospitalCount : hospitalResponse.data.length
    //             // });
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };
    
    //     fetchData();
    // }, []);

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


    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    console.log("search params are" +searchParams);
    // Fetch available slots whenever search parameters change
    useEffect(() => {
        if (searchParams.location && searchParams.department && searchParams.date) {
            fetchAvailableSlots();
        }
    }, [searchParams]);

    const fetchAvailableSlots = async () => {
        console.log("entered search");
        try {
            const response = await axios.get('/available-slots', { params: searchParams });
            setAvailableSlots(response.data);
        } catch (error) {
            console.error("Error fetching available slots:", error);
        }
    };

    return (
        <>
            {/* <UserLayout heading='Dashboard'>
            <div className="card-container">
                    <div className="dashboard_card" onClick={ () => { 
                        navigate('/doctor/department')
                    }}>
                        <h2>Department Count</h2>
                        <p >{dashboardCount.deptCount}</p>
                    </div>

                    <div className="dashboard_card">
                        <h2>Hospital Count</h2>
                        <p>{dashboardCount.hospitalCount}</p>
                    </div>

                    <div className="dashboard_card">
                        <h2>Appointment Count</h2>
                        <p></p>
                    </div>

                </div>
            </UserLayout> */}


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
                            {locations.map(location => (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            ))}
                    </select>
                    
                    <select name='department' value={searchParams.department} onChange={handleInputChange} required>
                        <option value="">Select Department</option>
                            {departments.map(department => (
                                <option key={department.deptid} value={department.deptid}>
                                    {department.name}
                                </option>
                            ))}
                    </select>
                    <input type="date" placeholder="Select Date"  onChange={handleInputChange} />
                    <button type="submit">Search</button>
                </form>
            </div>


            {availableSlots.length > 0 && (
                <div className="slots-section">
                    <h2>Available Slots</h2>
                    <ul>
                        {availableSlots.map((slot, index) => (
                            <li key={index}>{slot.time} - {slot.doctorName}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="main-content">
                <div className="card">
                <h2>Your Appointments</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Doctor</th>
                        <th>Department</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>2024-12-10</td>
                        <td>Dr. Smith</td>
                        <td>Cardiology</td>
                        <td>Confirmed</td>
                    </tr>
                    <tr>
                        <td>2024-12-15</td>
                        <td>Dr. Johnson</td>
                        <td>Dermatology</td>
                        <td>Pending</td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div className="card">
                <h2>Your Prescriptions</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Doctor</th>
                        <th>Prescription</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>2024-11-25</td>
                        <td>Dr. Smith</td>
                        <td><a href="#">View Prescription</a></td>
                    </tr>
                    <tr>
                        <td>2024-11-30</td>
                        <td>Dr. Johnson</td>
                        <td><a href="#">View Prescription</a></td>
                    </tr>
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