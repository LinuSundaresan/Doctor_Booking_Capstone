const express = require('express');

const checkToken = require('../middlewares/check-token');

const Department = require('../db/models/department-schema');

const { getDepartments , postDepartment , updateDepartment , deleteDepartment , getDepartment} = require('../controllers/department-controller');

const router = express.Router();

router.get('/' , checkToken(['Admin','User' ,'Doctor']), getDepartments);

// router.get('/' ,  getDepartments);

router.get('/:id' ,  getDepartment);

router.post('/',  postDepartment);

router.patch('/:id', updateDepartment);

router.delete('/:id',  deleteDepartment);


module.exports = router;