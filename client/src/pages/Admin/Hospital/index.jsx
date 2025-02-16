import './hospital.css';

import AdminLayout from '../../../components/AdminLayout';

import { Table , notification } from "antd";

import { Navigate, useNavigate } from 'react-router-dom';

import { useState , useEffect } from 'react';

import moment from 'moment';

import axios from '../../../utils/axios';

const Hospital = () => {

    const [hospitals , setHospitals] = useState([]);

        const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            render : (id) => { return <a>{id}</a>}
        },
        {
            title: 'Hospital',
            dataIndex: 'name',
            key: 'name',
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
            width : '30%'
        },
        {
            title: 'Departments',
            dataIndex: 'department',
            key: 'department',
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
            render : (id) => { return <i className="fa fa-edit table-icon" onClick={()=>{onEditHospital(id)}}></i>}
        },
        {
            title: 'Delete',
            dataIndex: '_id',
            key: 'delete',
            render : (id) => { return <i className="fa fa-trash table-icon" onClick={()=>{onDeleteHospital(id)}}></i>}
        },
    ];

    const getHospitals = async () => {
        const dbResponse = await axios.get('/hospital');
        setHospitals(dbResponse.data);
    };

    useEffect(()=> {
        getHospitals()
    }, []);

    const navigate = useNavigate();

    return (
        <>
            <AdminLayout heading="Hospital">
                
                <div className="add-btn-container">
                    <button className='add-button' onClick={ () => { 
                        navigate('/admin/add-hospital')
                    }}>Add Hospital</button>
                </div>
                <Table dataSource={hospitals}  columns={columns} />

            </AdminLayout>
            
        </>
    );
};

export default Hospital;