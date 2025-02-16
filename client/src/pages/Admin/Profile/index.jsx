
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios';

import AdminLayout from '../../../components/AdminLayout';

import { getId } from '../../../utils';
import './profile.css';

const Profile = () => {

    const [profiledata , setProfiledata] = useState({});

    const getProfileDetails = async () => {
        const dbResponse = await axios.get('admin/profile_data');
        setProfiledata(dbResponse.data);
    };

    useEffect(()=> {
        getProfileDetails()
    }, []);

    return (
        <AdminLayout heading="Admin Profile">
            <div className='admin-profile'>
                {getId()}
            </div>
        </AdminLayout>
    )
}

export default Profile;