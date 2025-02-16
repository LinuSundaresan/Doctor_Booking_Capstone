const Department = require('../db/models/department-schema.js');

module.exports.getDepartments = async(req,res)=> {
    try {
        const dbResponse = await Department.find();
        res.status(200).json(dbResponse);
    } catch (e) {
        res.status(500).json({message:e.message , error:true});
    }
};

module.exports.getDepartment = async(req,res)=> {
    try {
        const id = req.params.id;
        const department = await Department.findById(id, req.body);
        res.status(200).json(department);
    } catch (e) {
        res.status(500).json({message : e.message , error:true})
    }
};

module.exports.postDepartment = async (req, res)=> {
    try {
        const departments = await Department.create(req.body);
        res.status(201).json(departments);
    } catch (e) {
        res.status(500).json({message : e.message , error:true})
    }

};

module.exports.updateDepartment = async (req, res)=> {
    try {
        const id = req.params.id;
        const departments = await Department.findByIdAndUpdate(id, req.body);
        res.status(200).json(departments);
    } catch (e) {
        res.status(500).json({message : e.message , error:true})
    }
};

module.exports.deleteDepartment = async (req, res)=> {
    try {
        const id = req.params.id;
        const departments = await Department.findByIdAndDelete(id);
        res.status(200).json(departments);
    } catch (e) {
        res.status(500).json({message : e.message , error:true})
    }
};