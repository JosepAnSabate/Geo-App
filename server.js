// Calling Express and assign it to the app
const express = require("express");
const app = express();
const { Pool } = require('pg')
const {  queryLayer, getGeojson } = require('./controllers/layerController');
const layerRouter = require('./routes/api');

// require('dotenv').config()

//middleware
//using json we need to parse the data
app.use(express.json())
//setting middleware
app.use(express.static('public')); //Serves resources from public folder


// routes
//Serves all the request which includes /images in the url from Images folder
app.use('/', express.static(__dirname));

//new routes
app.use('/api', layerRouter); // http://localhost:4000/api/layers/layer


// initializating the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => 
    console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );