import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const SpecializationChart = () => {
  const [specializationData, setSpecializationData] = useState({});
  
  useEffect(() => {
    // Fetch doctor data from the API
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/doctor'); // Replace with your API endpoint
        const doctors = response.data;

        console.log(doctors);

        // Process data to count specializations
        const specializationCount = doctors.reduce((acc, doctor) => {
          acc[doctor.specialization] = (acc[doctor.specialization] || 0) + 1;
          return acc;
        }, {});

        // Prepare chart data
        setSpecializationData({
          labels: Object.keys(specializationCount),
          datasets: [
            {
              data: Object.values(specializationCount),
              backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
              ],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div style={{ width: '130px', margin: 'auto' }}>
      <h3>Specializations</h3>
      {specializationData.labels ? (
        <Pie data={specializationData} 
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default SpecializationChart;
