const express = require("express");
const app = express();
const { Pool } = require('pg');
const {  queryLayer, getGeojson, postGeojson } = require('./controllers/layerController');
const layerRouter = require('./routes/api');
const cors = require("cors");
const path = require('path'); // multiplataforma dels path linux windows
// load enviornment variables
const dotenv = require("dotenv");
dotenv.config({ path: './config/config.env'});
//require('dotenv').config('./config/config.env');


//middleware
app.use(cors());
//using json we need to parse the data
app.use(express.json());
app.use(express.static('public')); //Serves resources from public folder
app.use(express.urlencoded({extended: false}));//data a traves d'un form, coverteic form to object

// routes
//Serves all the request 
app.use('/', express.static(__dirname));

//new routes
app.use('/api', layerRouter); // http://localhost:4000/api/layers/layer


// initializating the server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => 
    console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`)
);