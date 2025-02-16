import './home.css';

import AdminLayout from '../../../components/AdminLayout';

import SpecializationChart from '../../../components/SpecializationCharts';

import { useState, useEffect } from 'react';

import axios from '../../../utils/axios';

import { useNavigate } from 'react-router-dom';

const Home = () => {

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

    const navigate = useNavigate();

    return (
        <>
            <AdminLayout heading="Home">
                <div className="card-container">
                    <div className="dashboard_card" onClick={ () => { 
                        navigate('/admin/department')
                    }}>
                        <h2>Department Count</h2>
                        <p >{dashboardCount.deptCount}</p>
                    </div>
                    <div className="dashboard_card" onClick={ () => { 
                        navigate('/admin/doctor')
                    }}>
                        <h2>Doctor Count</h2>
                        <p >{dashboardCount.doctorCount}</p>
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
            </AdminLayout>
            
        </>
    );
};

export default Home;