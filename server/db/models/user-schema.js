const {Schema , model} = require('mongoose');

const userSchema = Schema({
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        default : "http://localhost:3000/images/no-image.jpg"
    },
    age : {
        type : Number,
    },
    gender : {
        type : String,
    },
    height : {
        type : String,
    },
    weight : {
        type : String,
    },
    blood_group : {
        type : String,
    },
    phone_number : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        trim : true
    }
},
{
    timestamps : true,
});

const User = model('user' , userSchema);

module.exports = User;