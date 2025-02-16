const User = require('../db/models/user-schema');

const AvailableSlot = require('../db/models/slot-schema');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const generator = require('generate-password');

const nodemailer = require('nodemailer');

module.exports.userSignup = async (req , res) => {

    try {

        const {email , firstname} = req.body;
        const user = await User.findOne({email: email});

        if (user) {
            return res
            .status(400)
            .json({message : "Email Already Exists", error : true});
        }

        const password = generator.generate({
            length : 10,
            numbers : true
        });

        const hashedPassword = await bcrypt.hash(password , 2);

        const dbResponse = await User.create({...req.body, password : hashedPassword, role : 'User'});

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
            return res.status(200).json({message:'User has created and login details has been sent'});
        }
        });

        //return res.status(201).json({message: "Admin created successfully"})

    } catch (err) {
        return res.status(400).json({message : err.message , error: true});
    }

};


module.exports.userLogin = async (req,res) => {
    try {
        
        const {email,password} = req.body;

        const user = await User.findOne({email: email});

       console.log(user);

        if (!user) {
            console.log("here 1");
            return res.status(400).json({message : "Email or Password is incorrect 1"});
        }

        const isMatching = await bcrypt.compare(password, user.password);

        console.log("is matching " +isMatching);

        if (!isMatching) {
            console.log("here 2")
            return res.status(400).json({message : "Email or Password is incorrect"});
        }

        const token = jwt.sign({id : user._id , role : 'User'}, process.env.SECRET_KEY , {expiresIn : '7d'});

        return res.status(200).json({message: "You are logged in" , token : token , id : user._id});
        
    } catch (err) {
        res.status(500).json({message : err.message});
    }
};


module.exports.forgotPassword = async(req, res) => {

    try {
        const {email} = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res
            .status(500)
            .json({message: "Account doesnt exist" , error: true});
        }

        const resetToken = jwt.sign({id: user._id} , process.env.RESET_TOKEN, {
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
            text: `Hi ${user.firstname},
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

        const user = await User.findOne({email: email});
        if(!user) {
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

        const dbResponse = await User.findByIdAndUpdate(user._id, {password: hashedPassword});

        return res.status(200).json({message: "Password updated successfully"})
    }
    catch (err) {
        res.status(500).json({message : err.message});
    }

}

module.exports.getUsers = async(req,res)=> {
    try {
        const dbResponse = await User.find();
        res.status(200).json(dbResponse);
    } catch (e) {
        res.status(500).json({message:e.message , error:true});
    }
};

module.exports.getSingleUser = async(req,res)=> {
    try {
        const id = req.params.id;
        const user = await User.findById(id, req.body);
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({message : e.message , error:true})
    }
};

module.exports.updateUser = async (req, res)=> {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, req.body);
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({message : e.message , error:true})
    }
};

module.exports.deleteUser = async (req, res)=> {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({message : e.message , error:true})
    }
};

// Fetch available slots
// module.exports.getAvailableSlots = async (req, res) => {
//     try {
//         const slots = await AvailableSlot.find().populate('doctor').populate('department');
//         res.status(200).json(slots);
//     } catch (e) {
//         res.status(500).json({ message: e.message, error: true });
//     }
// };

// module.exports.getAvailableSlots = async (req, res) => {
//     try {
//         const slots = await AvailableSlot.find()
//             .populate({
//                 path: 'doctor',  // Populate the doctor
//                 populate: {
//                     path: 'department', // Nested populate to get department details
//                     model: 'departments' // Reference to Department model
//                 }
//             });

//         res.status(200).json(slots);
//     } catch (e) {
//         res.status(500).json({ message: e.message, error: true });
//     }
// };

module.exports.getAvailableSlots = async (req, res) => {
    try {
        const { hospital, department, date } = req.query;

        // Log received parameters for debugging
        console.log("Received Params:", { hospital,department, date });

        // Validate required parameters
        if (!department || !date) {
            return res.status(400).json({ message: "Missing required parameters", error: true });
        }

        // Convert date to ISO format to match MongoDB date storage
        const searchDate = new Date(date);

        // Convert date to start and end of the given day (00:00:00 to 23:59:59)
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        // Query available slots with relations
        const slots = await AvailableSlot.find({
            booked: false,
            date: { $gte: startOfDay, $lt: endOfDay } // Match date within the day
        }).populate({
                path: 'doctor',
                populate: [
                    { path: 'department', model: 'departments' },  // Get department details
                    { path: 'hospital', model: 'hospitals' }       // Get hospital details
                ]
            });

        // Filter slots based on department
        const filteredSlots = slots.filter(slot => 
            slot.doctor.department?._id.toString() === department &&
            slot.doctor.hospital?._id.toString() === hospital
        );


        res.status(200).json(filteredSlots);
    } catch (e) {
        console.error("Error fetching available slots:", e);
        res.status(500).json({ message: e.message, error: true });
    }
};

// Update an available slot
module.exports.updateAvailableSlot = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedSlot = await AvailableSlot.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedSlot);
    } catch (e) {
        res.status(500).json({ message: e.message, error: true });
    }
};