const express = require('express');

const checkToken = require('../middlewares/check-token');

const Department = require('../db/models/department-schema');

const { getDepartments , postDepartment , updateDepartment , deleteDepartment} = require('../controllers/department-controller');

const router = express.Router();

// router.get('/' , checkToken(['Admin', 'Doctor']), getDepartments);

router.get('/' ,  getDepartments);

router.post('/',  postDepartment);

router.patch('/:id', updateDepartment);

router.delete('/:id',  deleteDepartment);


module.exports = router;