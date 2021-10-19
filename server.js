// Calling Express and assign it to the app
const express = require("express");
const app = express();
const { Pool } = require('pg')
const {  queryLayer } = require('./controllers/layerController');
const layerRouter = require('./routes/api');

// require('dotenv').config()

//middleware
//using json we need to parse the data
app.use(express.json())



// routes
app.get('/', function (req, res) {
  res.render('index')
});

//new routes
app.use('/api', layerRouter); 


// initializating the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => 
    console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );