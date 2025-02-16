import './add-department.css';

import AdminLayout from '../../../components/AdminLayout';

import CustomInput from '../../../components/Input';

import CustomTextArea from '../../../components/Textarea';

import { Button , notification} from 'antd';

import axios from 'axios';

import { useNavigate , useParams } from 'react-router-dom';

import { useEffect , useState } from 'react';


const AddDepartment = () => {

        const [department , setDepartment] = useState({name: '', about: '', image : ''});

        const navigate = useNavigate();

        const {id} = useParams();

        useEffect(()=> {
            if(id) {
                getDepartmentById(id);
            }
        } , []);

        const getDepartmentById = async(id) => {

            const response = await axios.get(`http://localhost:3000/department/${id}`);

            setDepartment(response.data);

        }

        const onChange = (e, key) => {
            setDepartment({...department, [key]: e.target.value});
        };

        const onImageChange = async (e) => {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);

            const response = await axios.post('http://localhost:3000/image/upload', formData );

            setDepartment({...department , image : response.data.url});
        };

        const handleSaveSuccess = () => {
            notification.success({
                message: 'Department Added',
                description: 'The department has been successfully added.',
            });
        };

        const handleEditSuccess = () => {
            notification.success({
                message: 'Department Updated',
                description: 'The department has been successfully updated.',
            });
        };

        const addDepartment = async () => {
            const dbResponse = await axios.post('http://localhost:3000/department' , department);

            if(dbResponse.status === 200) {
                handleSaveSuccess();
                navigate('/admin/department');
            } else {
                navigate('/admin/add-department');
            }
            
        };

        const onEditDepartment = async () => {
            const dbResponse = await axios.patch(`http://localhost:3000/department/${id}` , department);

            if(dbResponse.status === 200) {
                handleEditSuccess();
                navigate('/admin/department');
            } else {
                navigate('/admin/add-department');
            }
        };

    return (
        <>
            <AdminLayout heading={id ? 'Edit Department' : 'Add Department'}>
                <div className="add-department-form">
                    <CustomInput type='text' label='Name' classname='input-name' value={department.name} onChange={(e)=>onChange(e, 'name')}/>
                    <CustomTextArea  label='About' classname='input-about' onChange={(e)=>onChange(e, 'about')} value={department.about} />
                    <div className="imd-div">
                        <CustomInput type='file' label='Image' classname='input-image' onChange={(e)=>onImageChange(e, 'image')}/>
                        <img src={department.image} alt={department.image} />
                    </div>
                    <Button className='add-button' onClick={id ? onEditDepartment : addDepartment}>
                        {id ? 'Edit Department' : 'Add Department' }</Button>
                </div>
            </AdminLayout>
            
        </>
    );
};

export default AddDepartment;