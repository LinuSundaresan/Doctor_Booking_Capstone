const express = require('express');

const checkToken = require('../middlewares/check-token');

const Department = require('../db/models/department-schema');

const { getDepartments , postDepartment , updateDepartment , deleteDepartment} = require('../controllers/department-controller');

const router = express.Router();

router.get('/' , checkToken, getDepartments);

router.post('/', checkToken, postDepartment);

router.patch('/:id', checkToken, updateDepartment);

router.delete('/:id', checkToken, deleteDepartment);


module.exports = router;