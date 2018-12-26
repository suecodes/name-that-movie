var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var movieQuotesRouter = require("./routes/moviequotes");
//var usersRouter = require('./routes/users');


var mongoose = require("mongoose");
//var mMovieQuotes = require("./models/moviequotes.js");

var app = express();

// DB setup
mongoose.connect("mongodb://localhost/namethatmovie", {
  useNewUrlParser: true
});

// Schema setup 
var moviequotesSchema = new mongoose.Schema({
  moviename: String,
  moviequote: String
});

module.exports = mongoose.model("moviequotes", moviequotesSchema);

// create moviequote record
var MovieQuotes = mongoose.model("MovieQuotes", moviequotesSchema);

MovieQuotes.create({
  moviename: "When Harry Met Sally",
  moviequote: "When you realize you want to spend the rest of your life with somebody, you want the rest of your life to start as soon as possible."
}, function (err, moviequote) {
  if (err) {
    console.log(err);
  } else {
    console.log("Newly created movie quote");
    console.log(moviequote);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'semantic')));

app.use("/", indexRouter);
app.use("/moviequotes", movieQuotesRouter);
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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;