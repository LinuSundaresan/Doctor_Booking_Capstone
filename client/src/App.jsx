import './App.css'

import { Routes , Route } from 'react-router-dom';


import AdminHome from './pages/Admin/Home';
import AdminDepartment from './pages/Admin/Department';
import AdminAddDepartment from './pages/Admin/AddDepartment';
import AdminHospital from './pages/Admin/Hospital';

const App = () => {

  return (
    <>
      <Routes>
        <Route path='/admin/home' element={<AdminHome/>} />
        <Route path='/admin/department' element={<AdminDepartment/>} />
        <Route path='/admin/add-department' element={<AdminAddDepartment/>} />
        <Route path='/admin/hospital' element={<AdminHospital/>} />
      </Routes>
    </>
  )
}

export default App;
