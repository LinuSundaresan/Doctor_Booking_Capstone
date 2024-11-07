const express = require('express');

const Hospital = require('../db/models/hospital-schema');

const { getHospitals , postHospital , updateHospital, deleteHospital} = require('../controllers/hospital-controller');

const router = express.Router();

router.get('/' , getHospitals);

router.post('/', postHospital);

router.patch('/:id', updateHospital);

router.delete('/:id', deleteHospital);

module.exports = router;