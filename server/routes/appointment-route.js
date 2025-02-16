const express = require('express');

const checkToken = require('../middlewares/check-token');

const router = express.Router();


const { bookSlot,getUserAppointments ,addPrescription} = require('../controllers/appointment-controller');


router.post('/book-slot' , checkToken(['Admin','User' ,'Doctor']), bookSlot);

router.get('/user/:id' , checkToken(['Admin','User' ,'Doctor']), getUserAppointments);

router.post('/save-prescription', addPrescription);

module.exports = router;