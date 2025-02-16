const express = require('express');

const router = express.Router();


const { userSignup , userLogin , getSingleUser } = require('../controllers/user-controller');

router.post('/signup', userSignup);

router.post('/login' ,  userLogin);

router.get('/:id' ,  getSingleUser);



module.exports = router;