import './dashboard.css';

import DoctorLayout from '../../../components/DoctorLayout';

import SpecializationChart from '../../../components/SpecializationCharts';

import { useNavigate } from 'react-router-dom';

import axios from '../../../utils/axios';

import { useState , useEffect } from 'react';

const Dashboard = () => {

    const navigate = useNavigate();

    const [dashboardCount , setDashboardCount] = useState({'deptCount': 0 , 'doctorCount': 0});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const deptResponse = await axios.get('http://localhost:3000/department');
                const doctorResponse = await axios.get('http://localhost:3000/doctor');
                const hospitalResponse = await axios.get('http://localhost:3000/hospital');
                setDashboardCount({
                    deptCount: deptResponse.data.length,
                    doctorCount: doctorResponse.data.length,
                    hospitalCount : hospitalResponse.data.length
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);

    return (
        <>
            <DoctorLayout heading='Dashboard'>
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

                    <div className="dashboard_card">
                        <SpecializationChart className="specilization-chart"/>
                    </div>
                

                </div>
            </DoctorLayout>
        </>
    )
}

export default Dashboard