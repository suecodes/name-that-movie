/**
 *  Application main entry point
 * 
 */

// Environment variables
require('dotenv').config();

// Logging using winston
const wlogger = require("./utils/logger.js");
wlogger.info("Starting app - Name That Movie");

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyparser = require("body-parser");
const flash = require("connect-flash");

// Authentication
const passport = require("passport");
const passportLocal = require("passport-local");
const User = require("./models/users");

// Routers
const indexRouter = require('./routes/index');
const movieQuotesRouter = require("./routes/moviequotes");
const movieCommentsRouter = require("./routes/comments");
//var usersRouter = require('./routes/users');	// future functionality - user profile

// Fill the database - comment out if you do not want to refresh db with data
//const fillDB = require("./filler");
//fillDB();
	
const app = express();

// DB setup
const mongoose = require("mongoose");
const env = process.env.NODE_ENV || "development";
const config = require('./mongoconfig')[env];
const localUrl = "mongodb://" + config.host + "/" + config.database;
const envUrl = process.env[config.use_env_variable];

wlogger.info("Config: " + config.use_env_variable);

const DATABASEURL = envUrl ? envUrl : localUrl;

mongoose.connect(DATABASEURL, {
	useNewUrlParser: true
});

wlogger.info("Database connected ...");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyparser.urlencoded({
	extended: true
}));
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'semantic')));

// Passport config
app.use(require("express-session")({
	secret: "Blah blah",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Make current user available to every route
app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// Routers
app.use("/", indexRouter);
app.use("/moviequotes", movieQuotesRouter);
app.use("/moviequotes/:id/comments", movieCommentsRouter);
//app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// Log to logger
	wlogger.error(err.message);

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;