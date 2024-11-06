const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/DoctorBookingDB')
.then(()=>{ 
    console.log('DB Connected');
})
.catch((e)=> {
    console.log(e);
});