import './user-login.css';

import CustomInput from '../../../components/Input';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../../utils/axios';

const Doctorlogin = () => {

    const navigate = useNavigate();

    const [login , setLogin] = useState({email : '', password : '' });

    const onChange = (e, key) => {

        setLogin({...login, [key] : e.target.value});
    };

    const onLogin = async() => {

        const response = await axios.post('/user/login', login);

        if(response && response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', response.data.id);
            navigate('/user/dashboard');
        }
    }

    return (
        <div className='admin-login'>
            <div className='admin-login-form'>

                <div className='heading'>
                    <h1>Doc Booking</h1>
                    <span>User</span>
                </div>
                <CustomInput label='Email' onChange= {(e)=>onChange(e, 'email') }/>
                <CustomInput label='Password' type='password' onChange= {(e)=>onChange(e, 'password') }/>
                <Button onClick={onLogin}>Login</Button>
            </div>
        </div>
    )

}

export default Doctorlogin;