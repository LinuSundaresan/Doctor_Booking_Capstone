import DoctorLayout from '../../../components/DoctorLayout';
import './doctorslot.css';
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import { getId } from '../../../utils';

const Doctorslot = () => {
    const [formData, setFormData] = useState({
        doctor: '',
        date: '',
        startTime: '',
        endTime: '',
    });

    const [message, setMessage] = useState('');

    // Set doctor ID when the component mounts
    useEffect(() => {
        const doctorId = getId();
        setFormData((prevData) => ({
            ...prevData,
            doctor: doctorId,
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedDate = new Date(formData.date).toISOString().split('T')[0];
            const dataToSend = {
                ...formData,
                date: formattedDate,
            };

            const response = await axios.post('/doctor/save-slot', dataToSend);
            setMessage(`Slot saved successfully: ${response.data.message}`);
            setFormData({ doctor: getId(), date: '', startTime: '', endTime: '' }); // Reset form, but keep doctor ID
        } catch (error) {
            console.error('Error saving slot:', error);
            setMessage('Error saving slot. Please try again.');
        }
    };

    return (
        <DoctorLayout>
            <div className="doctor-slot-container">
                <h2>Create Slot</h2>
                {message && <p className="message">{message}</p>}
                <form className="slot-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="doctor">Doctor ID:</label>
                        <input
                            type="text"
                            id="doctor"
                            name="doctor"
                            value={formData.doctor}
                            readOnly // Prevent manual editing
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="startTime">Start Time:</label>
                        <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="endTime">End Time:</label>
                        <input
                            type="time"
                            id="endTime"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">Save Slot</button>
                </form>
            </div>
        </DoctorLayout>
    );
};

export default Doctorslot;
