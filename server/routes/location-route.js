const express = require('express');

const checkToken = require('../middlewares/check-token');

const router = express.Router();


const { getLocations , postLocation , updateLocation, deleteLocation} = require('../controllers/location-controller');


router.get('/' , checkToken(['Admin','User' ,'Doctor']), getLocations);

router.post('/' ,  postLocation);

module.exports = router;