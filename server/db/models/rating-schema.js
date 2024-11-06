const {Schema , model} = require('mongoose');

const ratingSchema = Schema({
    rating : {
        type : Number,
        required : true,
    },
    comment : {
        type : String,
        required : true,
        trim : true,
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'users'
    },
    hospital : {
        type : Schema.Types.ObjectId,
        ref : 'hospitals'
    },
},
{
    timestamps : true,
});

const Rating = model('ratings' , ratingSchema);

module.exports = Rating;