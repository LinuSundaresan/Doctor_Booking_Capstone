import { NavLink , useNavigate} from 'react-router-dom';
import './admin-layout.css';


const AdminLayout = ({children , heading}) => {

    const navigate = useNavigate();


    const AdminLogout = () => {

        localStorage.removeItem('token');
        navigate('/admin/login');
    };

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
                            <NavLink className="menu-item" to="/admin/doctor">Doctor</NavLink>
                            <NavLink className="menu-item" to="/admin/hospital">Hospital</NavLink>
                            <NavLink className="menu-item" to="/admin/profile">Profile</NavLink>
                        </div>
                        <p className='menu-head'>Others</p>
                        <div className="menu-container">
                            <NavLink className="menu-item">Settings</NavLink>
                            <p className="menu-item" onClick={AdminLogout}>Logout</p>
                        
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