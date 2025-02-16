import './add-hospital.css';

import AdminLayout from '../../../components/AdminLayout';

import CustomInput from '../../../components/Input';

import CustomTextArea from '../../../components/Textarea';

import CustomSelect from '../../../components/Select';

import { Button } from 'antd';

import { useState , useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { notification } from 'antd';

import axios from '../../../utils/axios';

const AddHospital = () => {

    const [hospital , setHospital] = useState({});

    const [departments, setDepartments] = useState({}); 

     const {id} = useParams();

    const navigate = useNavigate();

    useEffect(()=> {
        getDepartments();
    } , []);

    const getDepartments = async() => {

        const response = await axios.get(`http://localhost:3000/department`);
        const departmentOptions = response.data.map(item => {
            return { label: item.name , value: item._id };
        })
        setDepartments(departmentOptions);

    }

    const onChange = (e, key) => {
        if (key === 'departments') {
            setHospital({ ...hospital, departments: e }); // `e` is the selected value(s) from the Select component
        } else {
            setHospital({ ...hospital, [key]: e.target.value }); // For other inputs, use `e.target.value`
        }
    };



    const addHospital = async () => {
        console.log(hospital);
        try {
            const dbResponse = await axios.post('http://localhost:3000/hospital' , hospital);
            if(dbResponse.status == 200) {
                handleSaveSuccess();
                navigate('/admin/hospital');
            } else {
                navigate('/admin/add-hospital');
            }
        } catch (e) {
            console.log("error " +e);
        }
        
    };

    const onEditHospital = async () => {
        const dbResponse = await axios.patch(`http://localhost:3000/doctor/${id}` , hospital);

        if(dbResponse.status == 200) {
            handleEditSuccess();
            navigate('/admin/hospital');
        } else {
            navigate(`/admin/add-hospital/${id}`);
        }
    };

    const handleSaveSuccess = () => {
        notification.success({
            message: 'Hospital Added',
            description: 'Hospital has been successfully added.',
        });
    };

    const handleEditSuccess = () => {
        notification.success({
            message: 'Hospital Updated',
            description: 'Hospital has been successfully updated.',
        });
    };

    console.log(departments);

    return (
        <AdminLayout heading='Add Hospital'>

            <div className="add-department-form">
                <CustomInput type='text' label='Name' classname='input-fname' value={hospital.name} onChange={(e)=>onChange(e, 'name')}/>
                {/* <CustomInput type='text' label='Location' classname='input-lname' value={hospital.location} onChange={(e)=>onChange(e, 'location')}/> */}
                <CustomSelect
                    label='Departments'
                    classname='input-email'
                    onChange={e => onChange(e, 'department')} 
                    options={departments}
                />
                {/* <CustomInput type='text' label='Speacialization' classname='input-specialization' value={hospital.specialization} onChange={(e)=>onChange(e, 'specialization')}/> */}
                <CustomTextArea  label='About' classname='input-about' onChange={(e)=>onChange(e, 'about')} value={hospital.about} />
                
                {/* <Button className='add-button' onClick={id ? onEditDoctor : addDoctor}>
                    {id ? 'Edit Doctor' : 'Add Doctor' }</Button> */}
                    <Button className='add-button' onClick={id ? onEditHospital : addHospital}>
                    {id ? 'Edit Hospital' : 'Add Hospital' }</Button>
            </div>

        </AdminLayout>
            
        
    );

};

export default AddHospital;