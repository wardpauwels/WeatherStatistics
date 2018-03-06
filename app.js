'use strict';
const http = require('http');
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const mongoose = require("mongoose");
const favicon = require('serve-favicon');

/**
 * Load environment variables
 * TODO Look for a better solution for .env files and variables
 */
require('dotenv').config();

/**
 * Connect to MongoDB with mongoose
 */
mongoose.connect(process.env.MONGODB_URL, {useMongoClient: true}).catch(err => {
    console.error(err);
});

/**
 * Make instances and start server
 */
const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 80;

httpServer.listen(port, function () {
    console.log(`Server running on port ${port}`);
});
const sessionStore = new MongoStore({mongooseConnection: mongoose.connection});

/**
 * View engine setup.
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * Express server middleware
 */
app.use(favicon(path.join(__dirname, 'public/assets/images', 'favicon.ico')));
// app.use(logger('dev')); //Set wanted logging format, more info @ https://github.com/expressjs/morgan
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
        //TODO Look further into sessions
        store: sessionStore,
        secret: process.env.SESSION_KEY,
        resave: false, //don't save session if unmodified
        saveUninitialized: false, // don't create session until something stored
        unset: 'destroy', //Remove session from sessionStore when user deserializes
    })
);



/**
 * Serve public folder static
 */
app.use(express.static(path.join(__dirname, './public')));

/**
 * Setup routes
 */

app.use('/api', require("./routes/api"));

app.get('/index', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/index', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/temperatuur', function (req, res) {
    res.sendFile(__dirname + "/public/temperatuur.html");
});

app.get('/regen', function (req, res) {
    res.sendFile(__dirname + "/public/regen.html");
});

app.get('/regensterkte', function (req, res) {
    res.sendFile(__dirname + "/public/regen.html");
});

app.get('/luchtvochtigheid', function (req, res) {
    res.sendFile(__dirname + "/public/luchtvochtigheid.html");
});

app.get('/druk', function (req, res) {
    res.sendFile(__dirname + "/public/druk.html");
});

app.get('/hoogte', function (req, res) {
    res.sendFile(__dirname + "/public/hoogte.html");
});

/**
 * Any other routes return 404
 */
app.get("*", function (req, res) {
    console.log(req);
    res.status(404).sendFile(__dirname+"/public/error.html");
});
