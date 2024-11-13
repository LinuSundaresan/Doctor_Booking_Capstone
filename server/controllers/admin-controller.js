const Admin = require('../db/models/admin-schema');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

module.exports.signup = async (req , res) => {

    try {

        const {email , password} = req.body;

        const admin = await Admin.findOne({email: email});

        if (admin) {
            return res.status(400).json({message : "Email Already Exists"});
        }

        const hashedPassword = await bcrypt.hash(password , 2);

        const dbResponse = await Admin.create({email : email, password : hashedPassword});

        return res.status(201).json({message: "Admin created successfully"})

    } catch (err) {
        return res.status(400).json({message : err.message , error: true});
    }

};


module.exports.login = async (req,res) => {

    try {
        
        const {email,password} = req.body;

        const admin = await Admin.findOne({email: email});

        if (!admin) {
            return res.status(400).json({message : "No Email or Password is incorrect"});
        }

        const isMatching = await bcrypt.compare(password, admin.password);

        if (!isMatching) {
            return res.status(400).json({message : "No Email or Password is incorrect"});
        }

        const token = jwt.sign({id : admin._id , role : admin.role}, process.env.SECRET_KEY , {expiresIn : '7d'});

        return res.status(200).json({message: "You are logged in" , token : token});
        
    } catch (err) {
        res.status(500).json({message : err.message});
    }
    
};