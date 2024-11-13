import './add-department.css';

import AdminLayout from '../../../components/AdminLayout';

import CustomInput from '../../../components/Input';

import CustomTextArea from '../../../components/Textarea';

import { Button } from 'antd';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { useEffect , useState } from 'react';


const AddDepartment = () => {

        const [department , setDepartment] = useState({name: '', about: '', image : ''});

        const navigate = useNavigate();

        const onChange = (e, key) => {
            setDepartment({...department, [key]: e.target.value});
        };

        const onImageChange = async (e) => {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);

            const response = await axios.post('http://localhost:3000/image/upload', formData );

            setDepartment({...department , image : response.data.url});
        };

        const addDepartment = async () => {
            const dbResponse = await axios.post('http://localhost:3000/department' , department);
            console.log(dbResponse);

            navigate('/admin/department');
        };

    return (
        <>
            <AdminLayout heading="Add Department">
                <div className="add-department-form">
                    <CustomInput type='text' label='Name' classname='input-name' onChange={(e)=>onChange(e, 'name')}/>
                    <CustomTextArea  label='About' classname='input-about' onChange={(e)=>onChange(e, 'about')}/>
                    <CustomInput type='file' label='Image' classname='input-image' onChange={(e)=>onImageChange(e, 'image')}/>
                    <Button className='add-button' onClick={addDepartment}>Add Department</Button>
                </div>
            </AdminLayout>
            
        </>
    );
};

export default AddDepartment;