const express = require('express');

const router = express.Router();


const { getAvailableSlots, updateAvailableSlot} = require('../controllers/user-controller');


router.get('/get-available-slots', getAvailableSlots); 

router.put('/:id', updateAvailableSlot); 

module.exports = router;