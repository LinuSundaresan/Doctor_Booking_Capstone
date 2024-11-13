const Doctor = require('../db/models/doctor-schema');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const generator = require('generate-password');

const nodemailer = require('nodemailer');

module.exports.signup = async (req , res) => {

    try {

        const {email , firstname} = req.body;
        const doctor = await Doctor.findOne({email: email});

        if (doctor) {
            return res
            .status(400)
            .json({message : "Email Already Exists", error : true});
        }

        const password = generator.generate({
            length : 10,
            numbers : true
        });

        const hashedPassword = await bcrypt.hash(password , 2);

        const dbResponse = await Doctor.create({...req.body, password : hashedPassword, role : 'Doctor'});

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'linudev93@gmail.com',
              pass: 'lefy mgkk rpma hqml'
            }
        });
          
        var mailOptions = {
            from: 'linudev93@gmail.com',
            to: email,
            subject: 'DOC APP LOGIN DETAILS',
            text: `Hi ${firstname},
                Your password is ${password}`
        };
          
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return res.status(500).json({message:error.message});
        } else {
            return res.status(200).json({message:'Doctor has created and login details has been sent'});
        }
        });

        //return res.status(201).json({message: "Admin created successfully"})

    } catch (err) {
        return res.status(400).json({message : err.message , error: true});
    }

};


module.exports.login = async (req,res) => {
    try {
        
        const {email,password} = req.body;

        const doctor = await Doctor.findOne({email: email});

       

        if (!doctor) {
            return res.status(400).json({message : "Email or Password is incorrect 1"});
        }

        const isMatching = await bcrypt.compare(password, doctor.password);

        if (!isMatching) {
            return res.status(400).json({message : "Email or Password is incorrect"});
        }

        const token = jwt.sign({id : doctor._id , role : 'Doctor'}, process.env.SECRET_KEY , {expiresIn : '7d'});

        return res.status(200).json({message: "You are logged in" , token : token});
        
    } catch (err) {
        res.status(500).json({message : err.message});
    }
};


module.exports.forgotPassword = async(req, res) => {

    try {
        const {email} = req.body;
        const doctor = await Doctor.findOne({email: email});
        if(!doctor){
            return res
            .status(500)
            .json({message: "Account doesnt exist" , error: true});
        }

        const resetToken = jwt.sign({id: doctor._id} , process.env.RESET_TOKEN, {
            expiresIn: '1h',
        });

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'linudev93@gmail.com',
              pass: 'lefy mgkk rpma hqml'
            }
        });
          
        var mailOptions = {
            from: 'linudev93@gmail.com',
            to: email,
            subject: 'DOC APP LOGIN DETAILS',
            text: `Hi ${doctor.firstname},
                Please reset your password using the link https://localhost:5173/${resetToken}`,
        };
          
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return res.status(500).json({message:error.message});
        } else {
            return res.status(200).json({message:'password has reset and details has been sent'});
        }
        });


    }
    catch (err) {
        res.status(500).json({message : err.message});
    }

};

module.exports.resetPassword = async(req, res) => {

    try {
        const {email, password, confirmPassword, token} = req.body;

        const doctor = await Doctor.findOne({email: email});
        if(!doctor) {
            return res
                .status(403)
                .json({message: 'Account doesnt exist', error:true});
        }

        if(password != confirmPassword) {
            return res
                .status(403)
                .json({message: 'Passwords do not match', error:true});
        }

        const isMatching = jwt.verify(token , process.env.RESET_TOKEN);

        const hashedPassword = await bcrypt.hash(password, 2);

        const dbResponse = await Doctor.findByIdAndUpdate(doctor._id, {password: hashedPassword});

        return res.status(200).json({message: "Password updated successfully"})
    }
    catch (err) {
        res.status(500).json({message : err.message});
    }

}