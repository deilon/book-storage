// import modules
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotEnv = require('dotenv');
dotEnv.config();
const app = express();

// Routes
const routes = require('./routes/AllRoutes'); 

//static file
app.use(express.static('public'));

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
  

// routes
app.use('/', routes);

//setup views
app.set('views', './views');
app.set('view engine', 'ejs');

//checking connection 
mongoose.connect(process.env.DB_CONNECT, () => {
    console.log('database connection is working')
});

// checking of server connection
const port = 4000;
app.listen(port, () => {
    console.log(`The server is running at port: ${port}`);
});


// To-Do here: 
// - display username 
// - redirect to /books after successful registration
// - partials > head.ejs (display login/logout button "Logic constraints")