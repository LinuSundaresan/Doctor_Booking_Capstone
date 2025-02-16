import { NavLink , useNavigate} from 'react-router-dom';
import './doctor-layout.css';


const DoctorLayout = ({children , heading}) => {

    const navigate = useNavigate();


    const DoctorLogout = () => {

        localStorage.removeItem('token');
        navigate('/doctor/login');
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
                            <NavLink className="menu-item" to="/doctor/dashboard">Home</NavLink>
                            <NavLink className="menu-item" to="/doctor/slots">Slot</NavLink>
                            <NavLink className="menu-item" to="/doctor/list-appointments">Appointments</NavLink>
                            <NavLink className="menu-item" to="/doctor/hospital">Hospital</NavLink>
                            <NavLink className="menu-item" to="/doctor/profile">Profile</NavLink>
                        </div>
                        <p className='menu-head'>Others</p>
                        <div className="menu-container">
                            <NavLink className="menu-item">Settings</NavLink>
                            <p className="menu-item" onClick={DoctorLogout}>Logout</p>
                        
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

export default DoctorLayout;