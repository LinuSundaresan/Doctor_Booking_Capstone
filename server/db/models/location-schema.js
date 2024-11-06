const {Schema , model} = require('mongoose');

const locationSchema = Schema({
    name : {
        type : String,
        required : true,
        trim :  true,
    }
},
{
    timestamps : true,
});

const Location = model('locations' , locationSchema);

module.exports = Location;