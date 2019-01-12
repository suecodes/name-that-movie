var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require("body-parser");
var indexRouter = require('./routes/index');
var movieQuotesRouter = require("./routes/moviequotes");
var movieCommentsRouter = require("./routes/comments");
//var usersRouter = require('./routes/users');

var app = express();

// DB setup
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/namethatmovie", {
  useNewUrlParser: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyparser.urlencoded({
  extended: true
}));
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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;