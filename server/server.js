const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const db = require('./db/index.js');
const Admin = require('./db/models/admin-schema.js');
const Department = require('./db/models/department-schema.js');
const Hospital = require('./db/models/hospital-schema.js');
const Appointment = require('./db/models/appointment-schema.js');
const Prescription = require('./db/models/prescription-schema.js');
const Rating = require('./db/models/rating-schema.js');
const User = require('./db/models/user-schema.js');
const Doctor = require('./db/models/doctor-schema.js');
const Location = require('./db/models/location-schema.js');
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const routes = require('./routes');

dotenv.config({path: './.env'});

app.use(routes);

app.use('*' , (req, res) => {
    res.status(404).json({message : "No route found for this path"});
});

app.listen(port, (req, res)=> {
    console.log(`App is listening on https://localhost:3000` );
});