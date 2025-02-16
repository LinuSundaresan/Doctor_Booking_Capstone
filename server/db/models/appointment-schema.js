const {Schema , model} = require('mongoose');

const appointmentSchema = Schema({
    date : {
        type : Date,
        required : true,
    },
    timeslot : {
        type : String,
        required : true,
    },
    doctor : {
        type : Schema.Types.ObjectId,
        ref : 'doctors'
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    hospital : {
        type : Schema.Types.ObjectId,
        ref : 'hospitals'
    }, 
    department : {
        type : Schema.Types.ObjectId,
        ref : 'departments'
    },

},
{
    timestamps : true,
});

const Appointment = model('appointments' , appointmentSchema);

module.exports = Appointment;