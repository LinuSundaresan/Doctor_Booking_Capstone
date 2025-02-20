import './department.css';

import AdminLayout from '../../../components/AdminLayout';

import { Table , notification } from "antd";

import moment from "moment";

import axios from '../../../utils/axios';

import { useNavigate } from 'react-router-dom';

import { useEffect , useState } from 'react';

const Department = () => {

        const [departments , setDepartments] = useState([]);

        const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            render : (id) => { return <a>{id}</a>}
        },
        {
            title: 'Name',
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
            width : '40%'
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
            render : (id) => { return <i className="fa fa-edit table-icon" onClick={()=>{onEditDepartment(id)}}></i>}
        },
        {
            title: 'Delete',
            dataIndex: '_id',
            key: 'delete',
            render : (id) => { return <i className="fa fa-trash table-icon" onClick={()=>{onDeleteDepartment(id)}}></i>}
        },
        ];

        const getDepartment = async () => {
            const dbResponse = await axios.get('http://localhost:3000/department');
            setDepartments(dbResponse.data);
        };

        useEffect(()=> {
            getDepartment()
        }, []);

        const handleSuccess = () => {
            notification.success({
                message: 'Department Deleted',
                description: 'The department has been successfully deleted.',
            });
        };

        const onDeleteDepartment = async(id) => {

            const response = await axios.delete(`/department/${id}`);
            getDepartment();

            console.log(response);
            if (response.status === 200) {
                handleSuccess();
            }

            
              
        }

        const navigate = useNavigate();

        const onEditDepartment = ( id ) => {
            navigate(`/admin/edit-department/${id}`);
        }

        const showNotification = (type, message, description) => {
            notification[type]({
              message: message,
              description: description,
              placement: 'topRight', // Optional: Change placement ('topLeft', 'bottomRight', etc.)
            });
        };

    return (
        <>
            <AdminLayout heading="Department">
                
                <div className="add-btn-container">
                    <button className='add-button' onClick={ () => { 
                        navigate('/admin/add-department')
                    }}>Add Department</button>
                </div>
                <Table dataSource={departments}  columns={columns} />

            </AdminLayout>
            
        </>
    );
};

export default Department;