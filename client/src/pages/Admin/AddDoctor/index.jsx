import './add-doctor.css';

import AdminLayout from '../../../components/AdminLayout';

import CustomInput from '../../../components/Input';

import CustomTextArea from '../../../components/Textarea';

import { Button , notification } from 'antd';

import axios from 'axios';

import { useNavigate , useParams } from 'react-router-dom';

import { useEffect , useState } from 'react';


const AddDoctor = () => {

        const [doctor , setDoctor] = useState({firstname: '',lastname : '',email : '', about: '', specialization : ''});

        const navigate = useNavigate();

        const {id} = useParams();

        useEffect(()=> {
            if(id) {
                getDoctorById(id);
            }
        } , []);

        const getDoctorById = async(id) => {

            const response = await axios.get(`http://localhost:3000/doctor/${id}`);

            setDoctor(response.data);

        }

        const onChange = (e, key) => {
            setDoctor({...doctor, [key]: e.target.value});
        };

        console.log(doctor);

    

        const addDoctor = async () => {
            const dbResponse = await axios.post('http://localhost:3000/doctor/signup' , doctor);

            if(dbResponse.status == 200) {
                handleSaveSuccess();
                navigate('/admin/doctor');
            } else {
                navigate('/admin/add-doctor');
            }
            
        };

        const onEditDoctor = async () => {
            const dbResponse = await axios.patch(`http://localhost:3000/doctor/${id}` , doctor);

            if(dbResponse.status == 200) {
                handleEditSuccess();
                navigate('/admin/doctor');
            } else {
                navigate(`/admin/add-doctor/${id}`);
            }
        };

        const handleSaveSuccess = () => {
            notification.success({
                message: 'Doctor Added',
                description: 'Doctor has been successfully added.',
            });
        };

        const handleEditSuccess = () => {
            notification.success({
                message: 'Doctor Updated',
                description: 'Doctor has been successfully updated.',
            });
        };
        

    return (
        <>
            <AdminLayout heading={id ? 'Edit Doctor' : 'Add Doctor'}>
                <div className="add-department-form">
                    <CustomInput type='text' label='Firts name' classname='input-fname' value={doctor.firstname} onChange={(e)=>onChange(e, 'firstname')}/>
                    <CustomInput type='text' label='Last name' classname='input-lname' value={doctor.lastname} onChange={(e)=>onChange(e, 'lastname')}/>
                    <CustomInput type='text' label='Email' classname='input-email' value={doctor.email} onChange={(e)=>onChange(e, 'email')}/>
                    <CustomInput type='text' label='Speacialization' classname='input-specialization' value={doctor.specialization} onChange={(e)=>onChange(e, 'specialization')}/>
                    <CustomTextArea  label='About' classname='input-about' onChange={(e)=>onChange(e, 'about')} value={doctor.about} />
                    
                    <Button className='add-button' onClick={id ? onEditDoctor : addDoctor}>
                        {id ? 'Edit Doctor' : 'Add Doctor' }</Button>
                </div>
            </AdminLayout>
            
        </>
    );
};

export default AddDoctor;