import CustomInput from '../../../components/Input';
import { Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios';
import './login.css';

const Login = () => {

    const navigate = useNavigate();

    const [login , setLogin] = useState({email : '', password : '' });

    const onChange = (e, key) => {

        setLogin({...login, [key] : e.target.value});
    };

    const onLogin = async() => {

        const response = await axios.post('admin/login', login);

        if(response && response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('role', response.data.role);
            navigate('/admin/department');
        }
    }

    return (
        <div className='admin-login'>
            <div className='admin-login-form'>

                <div className='heading'>
                    <h1>Doc Booking</h1>
                    <span>Admin</span>
                </div>
                <CustomInput label='Email' onChange= {(e)=>onChange(e, 'email') }/>
                <CustomInput label='Password' type='password' onChange= {(e)=>onChange(e, 'password') }/>
                <Button onClick={onLogin}>Login</Button>
            </div>
        </div>
    )
}

export default Login;