const Location = require('../db/models/location-schema.js');

module.exports.getLocations = async(req,res)=> {
    try {
        const dbResponse = await Location.find();
        res.status(200).json(dbResponse);
    } catch (e) {
        res.status(500).json({message:e.message , error:true});
    }
};

module.exports.postLocation = async (req, res)=> {
    try {
        const location = await Location.create(req.body);
        res.status(201).json(location);
    } catch (e) {
        res.status(500).json({message : e.message , error:true})
    }

};

module.exports.updateLocation = async (req, res)=> {
    try {
        const id = req.params.id;
        const locations = await Location.findByIdAndUpdate(id, req.body);
        res.status(200).json(locations);
    } catch (e) {
        res.status(500).json({message : e.message , error:true})
    }
};

module.exports.deleteLocation = async (req, res)=> {
    try {
        const id = req.params.id;
        const locations = await Location.findByIdAndDelete(id);
        res.status(200).json(locations);
    } catch (e) {
        res.status(500).json({message : e.message , error:true})
    }
};

