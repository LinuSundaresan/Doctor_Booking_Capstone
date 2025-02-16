const express = require('express');

const router = express.Router();

const { signup , login , forgotPassword, resetPassword, getDoctors , getDoctor, updateDoctor, deleteDoctor, saveSlot, getSlot, getAppointments } = require('../controllers/doctor-controller');

router.get('/', getDoctors);

router.get('/:id' ,  getDoctor);

router.patch('/:id', updateDoctor);

router.delete('/:id', deleteDoctor);

router.post('/signup', signup);

router.post('/doctor-login', login);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

router.post('/save-slot', saveSlot);

router.post('/get-doctor-slot/:id', getSlot);

router.get('/appointments/:id', getAppointments);




module.exports = router;