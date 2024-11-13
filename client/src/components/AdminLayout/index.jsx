import { NavLink } from 'react-router-dom';
import './admin-layout.css';
import { Table } from "antd";

const AdminLayout = ({children , heading}) => {

    return (
        <>
            <div className="admin-layout">
                <div className="sidebar">
                    <div className="logo">
                        <img src="/logo.png" alt="logo" />
                    </div>
                    <div className="menu">
                        <p className='menu-head'>Pages</p>
                        <div className="menu-container">
                            <NavLink className="menu-item" to="/admin/home">Home</NavLink>
                            <NavLink className="menu-item" to="/admin/department">Department</NavLink>
                            <NavLink className="menu-item">Doctor</NavLink>
                            <NavLink className="menu-item" to="/admin/hospital">Hospital</NavLink>
                            <NavLink className="menu-item">Profile</NavLink>
                        </div>
                        <p className='menu-head'>Others</p>
                        <div className="menu-container">
                            <NavLink className="menu-item">Settings</NavLink>
                            <NavLink className="menu-item">Logout</NavLink>
                        
                        </div>
                    </div>
                    
                </div>
                <nav></nav>
                    <div className="container">
                        <h1>{heading}</h1>
                        {children}
                    </div>
            </div>
        </>
    )
    
};

export default AdminLayout;