const Hospital = require('../db/models/hospital-schema');

module.exports.getHospitals = async(req, res) => {
    
    try {

        const hospitals = await Hospital.find();
        res.status(200).json(hospitals);

    } catch (err) {
        
        res.status(500).json({ "message" : err.message , error: true});
   
    }
    
};

module.exports.postHospital = async (req, res)=> {
    try {
         console.log(req.body);
        const hospital = await Hospital.create(req.body);
        res.status(201).json(hospital);
    } catch (e) {
        res.status(500).json({message : e.message , error:true})
    }

};

module.exports.updateHospital = async (req, res)=> {
    try {
        const id = req.params.id;
        const hospital = await Hospital.findByIdAndUpdate(id, req.body);
        res.status(200).json(hospital);
    } catch (e) {
        res.status(500).json({message : e.message , error:true})
    }
};

module.exports.deleteHospital = async (req, res)=> {
    try {
        const id = req.params.id;
        const hospital = await Hospital.findByIdAndDelete(id);
        res.status(200).json(hospital);
    } catch (e) {
        res.status(500).json({message : e.message , error:true})
    }
};