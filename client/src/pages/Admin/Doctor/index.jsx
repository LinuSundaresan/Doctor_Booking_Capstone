import './doctor.css';

import AdminLayout from '../../../components/AdminLayout';

import { Table , notification } from "antd";

import moment from "moment";

import axios from '../../../utils/axios';

import { useNavigate } from 'react-router-dom';

import { useEffect , useState } from 'react';

const Doctor = () => {

    const navigate = useNavigate();


    const [doctors , setDoctors] = useState([]);

        const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            render : (id) => { return <a>{id}</a>}
        },
        {
            title: 'Firstname',
            dataIndex: 'firstname',
            key: 'firstname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render : (image)=>{ return <img src={image} className='table-image'/>}
        },
        {
            title: 'About',
            dataIndex: 'about',
            key: 'about',
            width : '40%'
        },
        {
            title: 'Specialization',
            dataIndex: 'specialization',
            key: 'specialization',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render : (date)=> { return moment(date).format('MM/DD/YYYY') }
        },
        {
            title: 'Edit',
            dataIndex: '_id',
            key: 'edit',
            render : (id) => { return <i className="fa fa-edit table-icon" onClick={()=>{onEditDoctor(id)}}></i>}
        },
        {
            title: 'Delete',
            dataIndex: '_id',
            key: 'delete',
            render : (id) => { return <i className="fa fa-trash table-icon" onClick={()=>{onDeleteDoctor(id)}}></i>}
        },
        ];

        const getDoctors = async () => {
            const dbResponse = await axios.get('http://localhost:3000/doctor');
            setDoctors(dbResponse.data);
        };

        useEffect(()=> {
            getDoctors()
        }, []);


        const onEditDoctor = ( id ) => {
            navigate(`/admin/edit-doctor/${id}`);
        }

        const handleSuccess = () => {
            notification.success({
                message: 'Doctor Deleted',
                description: 'The doctor has been successfully deleted.',
            });
        };

        const onDeleteDoctor = async ( id ) => {
            const response = await axios.delete(`http://localhost:3000/doctor/${id}`);

            if (response.status === 200) {
                handleSuccess();
            }

            getDoctors();
        }
        
    
    return (
        <>
            <AdminLayout heading="Doctors">
                <div className="add-btn-container">
                    <button className='add-button' onClick={ () => { 
                        navigate('/admin/add-doctor')
                    }}>Add Doctor</button>
                </div>
                <Table dataSource={doctors}  columns={columns} />
            </AdminLayout>
            
        </>
    );

};

export default Doctor;