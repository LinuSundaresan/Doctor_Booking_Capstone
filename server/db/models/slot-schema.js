const {Schema , model, SchemaType} = require('mongoose');

const slotSchema = Schema(
    {
        doctor : {
            type : Schema.Types.ObjectId,
            ref : 'doctors',
        },
        date: {
            type : Date,
            required : true,
        },
        startTime : {
            type : String,
            required : true,
        },
        endTime : {
            type : String,
            required : true,
        },
        booked : {
            type : Boolean,
            default : false,
        }
    },
    {
        timestamps : true
    }
)

const Slots = model('slots' , slotSchema);

module.exports = Slots;