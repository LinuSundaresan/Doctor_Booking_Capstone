import './App.css'

import { Routes , Route } from 'react-router-dom';

import AdminLogin from './pages/Admin/Login';
import AdminHome from './pages/Admin/Home';
import AdminDepartment from './pages/Admin/Department';
import AdminAddDepartment from './pages/Admin/AddDepartment';
import AdminProfile from './pages/Admin/Profile';

import AdminHospital from './pages/Admin/Hospital';
import AdminAddHospital from './pages/Admin/AddHospital';

import AdminDoctor from './pages/Admin/Doctor';
import AdminAddDoctor from './pages/Admin/AddDoctor';


import Doctorlogin from './pages/Doctor/Doctorlogin';
import DoctorDashboard from './pages/Doctor/Dashboard';
import DoctorSlots from './pages/Doctor/Doctorslot';
import Listdoctorslots from './pages/Doctor/Listdoctorslots';
import Doctorappointment from './pages/Doctor/Doctorappointments';

import UserLogin from './pages/User/Userlogin';
import UserDashboard from './pages/User/Dashboard';
import UserProfile from './pages/User/Profile';

import PrivateRoute from './components/PrivateRoute';

const App = () => {

  return (
    <>
      <Routes>
        <Route path='/admin/login' element={<AdminLogin/>} />

          <Route path='/admin' element={<PrivateRoute/>}>
            <Route path='/admin/home' element={<AdminHome/>} />
            <Route path='/admin/department' element={<AdminDepartment/>} />
            <Route path='/admin/add-department' element={<AdminAddDepartment/>} />
            <Route path='/admin/edit-department/:id' element={<AdminAddDepartment/>} />
            <Route path='/admin/profile' element={<AdminProfile/>} />

            <Route path='/admin/doctor' element={<AdminDoctor/>} />
            <Route path='/admin/add-doctor' element={<AdminAddDoctor/>} />
            <Route path='/admin/edit-doctor/:id' element={<AdminAddDoctor/>} />

            <Route path='/admin/hospital' element={<AdminHospital/>} />
            <Route path='/admin/add-hospital' element={<AdminAddHospital/>} />

            
          </Route>

          <Route path='/doctor/login' element={<Doctorlogin/>} />
          <Route path='/doctor/dashboard' element={<DoctorDashboard/>} />
          <Route path='/doctor/slots' element={<DoctorSlots/>} />
          <Route path='/doctor/list-slots' element={<Listdoctorslots/>} />
          <Route path='/doctor/list-appointments' element={<Doctorappointment/>} />


          <Route path='/user/login' element={<UserLogin/>} />
            <Route path='/user/dashboard' element={<UserDashboard/>} />
            <Route path='/user/profile' element={<UserProfile/>} />
        
      </Routes>

            
         
    </>
  )
}

export default App;
