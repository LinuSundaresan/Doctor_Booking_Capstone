const express = require('express');

const departmentRoutes = require('./department-route.js');

const imageRoutes = require('./images-route.js');

const adminRoutes = require('./admin-route.js');

const doctorRoutes = require('./doctor-route.js');

const hospitalRoutes = require('./hospital-route.js');

const userRoutes = require('./user-route.js');

const locationRoutes = require('./location-route.js');

const slotRoutes = require('./available-slots-route.js');

const appointmentRoutes = require('./appointment-route.js');

const router = express.Router();

router.use('/department' , departmentRoutes);

router.use('/image', imageRoutes);

router.use('/admin/', adminRoutes);

router.use('/doctor/', doctorRoutes);

router.use('/hospital', hospitalRoutes);

router.use('/user', userRoutes);

router.use('/location', locationRoutes);

router.use('/slots', slotRoutes);

router.use('/appointment', appointmentRoutes);

module.exports = router;