const {Schema , model} = require('mongoose');
//const Department = require('./department-schema');

// const slotSchema = Schema({
//     date : {
//         type : Date,
//         required : true
//     },
//     starttime : {
//         type : String,
//         required : true
//     },
//     endtime : {
//         type : String,
//         required : true
//     },
//     slotNumber : {
//         type : Number,
//         required : true
//     }
// });

const doctorSchema = Schema({
    firstname : {
        type : String,
        required : true,
        trim :  true,
    },
    lastname : {
        type : String,
        required : true,
        trim :  true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    hospital : {
        type : Schema.Types.ObjectId,
        ref : 'hospitals'
    }, 
    department : {
        type : Schema.Types.ObjectId,
        ref : 'departments'
    },
    specialization : {
        type : String,
        required : true,
    },
    about : {
        type : String,
        trim : true,
        required : true
    },
    image : {
        type : String,
        default : 'http://localhost/images/no-image.jpg'
    },
    //timeslot : [slotSchema]

},
{
    timestamps : true,
});

const Doctor = model('doctors' , doctorSchema);

module.exports = Doctor;