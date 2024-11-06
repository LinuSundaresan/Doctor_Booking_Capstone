const {Schema , model} = require('mongoose');

const departmentSchema = Schema({
    name : {
        type : String,
        unique : true,
        required : true,
    },
    image : {
        type : String,
        default : "http://localhost:3000/images/no-image.jpg"
    },
    about : {
        type : String,
    }
},
{
    timestamps : true,
});

const Department = model('departments' , departmentSchema);

module.exports = Department;