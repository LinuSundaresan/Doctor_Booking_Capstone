const express = require('express');

const departmentRoutes = require('./department-route.js');

const imageRoutes = require('./images-route.js');

const adminRoutes = require('./admin-route.js');

const doctorRoutes = require('./doctor-routes.js');

const hospitalRoutes = require('./hospital-route.js');

const router = express.Router();

router.use('/department' , departmentRoutes);

router.use('/image', imageRoutes);

router.use('/admin/', adminRoutes);

router.use('/doctor', doctorRoutes);

router.use('/hospital', hospitalRoutes);

module.exports = router;