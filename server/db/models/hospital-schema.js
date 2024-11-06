const { name } = require('ejs');
const {Schema , model} = require('mongoose');

const slotSchema = Schema({
    date : {
        type : Date,
        required : true
    },
    starttime : {
        type : String,
        required : true
    },
    endtime : {
        type : String,
        required : true
    },
    slotNumber : {
        type : Number,
        required : true
    }
});

const hospitalSchema = Schema({
    name : {
        type : String,
        required : true,
        trim :  true,
    },
    location : {
        type : Schema.Types.ObjectId,
        ref : 'locations'
    },
    about : {
        type : String,
        trim : true,
        required : true
    },
    department : {
        type : Schema.Types.ObjectId,
        ref : 'departments'
    },
    phonenumber : {
        type : String,
        required : true
    },
    reviews : [{
        type : Schema.Types.ObjectId,
        ref : 'reviews'
    }],
    image : {
        type : String,
        default : 'http://localhost/images/no-image.jpg'
    },
    timeslot : [slotSchema]

},
{
    timestamps : true,
});

const Hospital = model('hospitals' , hospitalSchema);

module.exports = Hospital;