import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UserLayout from '../../../components/UserLayout';

import { getId } from '../../../utils';

const Profile = () => {
    const [profiledata, setProfiledata] = useState({});
    
    // Assuming getId() is a function that returns a user ID
    // const getId = () => {
    //     // Implement logic to retrieve the ID
    //     return 'userId';
    // };

    const getProfileDetails = async () => {
        try {
            const dbResponse = await axios.get(`http://localhost:3000/user/${getId()}`);
            console.log(dbResponse);
            setProfiledata(dbResponse.data);
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    useEffect(() => {
        getProfileDetails();
    }, []);

    return (
        <UserLayout heading="User Profile">
            <div className='admin-profile'>
                <div className='profileData'>
                    <span>User ID:</span> {getId()}
                </div>
                <div className='profileData'>
                    <span>Name:</span> {profiledata.firstname} {profiledata.lastname}
                </div>
                <div className='profileData'>
                    <span>Email:</span> {profiledata.email}
                </div>
                {/* Add other profile fields as necessary */}
            </div>
        </UserLayout>
    );
};

export default Profile;
