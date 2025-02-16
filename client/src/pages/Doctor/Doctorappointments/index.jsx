import DoctorLayout from '../../../components/DoctorLayout';

import './doctorappointments.css';

import { Table, Button, Modal, Input, notification } from "antd";

import moment from "moment";

import axios from '../../../utils/axios';

import { useNavigate } from 'react-router-dom';

import { useEffect , useState } from 'react';

import { getId } from '../../../utils';



const Doctorappointment = () => {


    const [appointments , setAppointments] = useState([]);

    const [prescription, setPrescription] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

        const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            render : (id) => { return <a>{id}</a>}
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render : (date)=> { return moment(date).format('MM/DD/YYYY') }
        },
        {
            title: 'Slot',
            dataIndex: 'timeslot',
            key: 'timeslot',
        },
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: (user) => user?.firstname || 'N/A',
        },
        {
            title: 'Prescription',
            key: 'prescription',
            render: (_, record) => (
                <Button type="primary" onClick={() => openPrescriptionModal(record._id)}>
                    Add Prescription
                </Button>
            ),
        },
        
        ];

        const getDoctorAppointments = async () => {
            const dbResponse = await axios.get('http://localhost:3000/doctor/appointments/672ada69fa42bc7bc1b7d2e4');
            setAppointments(dbResponse.data.appointments);
        };

        useEffect(()=> {
            getDoctorAppointments()
        }, []);


        // Open modal with selected appointment ID
        const openPrescriptionModal = (appointmentId) => {
            setSelectedAppointmentId(appointmentId);
            setPrescription(""); // Clear previous input
            setIsModalOpen(true);
        };

        // Close modal
        const closePrescriptionModal = () => {
            setIsModalOpen(false);
        };

        // Handle prescription submission
        const savePrescription = async () => {
            try {
                await axios.post('http://localhost:3000/appointment/save-prescription', {
                    appointmentId: selectedAppointmentId,
                    prescription
                });

                notification.success({ message: "Prescription saved successfully!" });
                closePrescriptionModal();
            } catch (error) {
                console.error("Error saving prescription:", error);
                notification.error({ message: "Failed to save prescription." });
            }
        };


        // Open modal with selected appointment ID



    return (
        <DoctorLayout>

            <div className="doctor-appointment-container">
                <h2>List Appointments</h2>

                <Table dataSource={appointments}  columns={columns} />

                {/* Prescription Modal */}
                <Modal
                    title="Add Prescription"
                    open={isModalOpen}
                    onOk={savePrescription}
                    onCancel={closePrescriptionModal}
                    okText="Save"
                    cancelText="Cancel"
                >
                    <Input.TextArea
                        rows={4}
                        value={prescription}
                        onChange={(e) => setPrescription(e.target.value)}
                        placeholder="Enter prescription details here..."
                    />
                </Modal>
            </div>

        </DoctorLayout>
    );
};


export default Doctorappointment;