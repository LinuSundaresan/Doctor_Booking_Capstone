const {Schema , model} = require('mongoose');

const prescriptionSchema = Schema({
    doctor : {
        type : Schema.Types.ObjectId,
        ref : 'doctors'
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'users'
    },
    hospital : {
        type : Schema.Types.ObjectId,
        ref : 'hospitals'
    }, 
    department : {
        type : Schema.Types.ObjectId,
        ref : 'departments'
    },
    appointment : {
        type : Schema.Types.ObjectId,
        ref : 'appointments'
    },
    prescription : [{
        type : String,
        trim : true,
    }]

},
{
    timestamps : true,
});

const Prescription = model('prescriptions' , prescriptionSchema);

module.exports = Prescription;