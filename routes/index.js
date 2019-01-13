/**
 *  Movie Quotes
 * 
 *  RESTful routing:
 *  --- Landing page ---
 *  SHOW    /           GET     Display landing page and random quote for quiz
 *  
 *  --- Authentication ---
 *  SHOW	/register	GET		Display register page
 *  CREATE	/register	POST	Register user
 *  SHOW	/login		GET		Display login page
 *	CREATE	/login		POST	Login user 
 */

var express = require('express');
var router = express.Router();
var Moviequotes = require("../models/moviequotes");

// Authentication
var passport = require("passport");
var passportLocal = require("passport-local");
var User = require("../models/users");

// Middleware
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

// SHOW home page and random quote
router.get("/", function (req, res, next) {

	// Get random sampling of quotes 
	Moviequotes.aggregate([{
		$sample: {
			size: 4
		}
	}]).exec(function (err, result) {
		if (err) {
			console.log(err);
		} else {
			// Render page and return result
			res.render('landing', {
				title: 'Name That Movie',
				result: result,
				quiz: Math.floor(Math.random() * 4)
			});
		}
	});
});

// Authentication routes

// SHOW register form
router.get("/register", function (req, res) {
	res.render("authenticate/register");
});

// POST Sign Up Logic Handler
router.post("/register", function (req, res) {
	var newUser = new User({
		username: req.body.username
	});
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			// Username already exists
			console.log(err);
			return res.render("authenticate/register");
		}
		passport.authenticate("local")(req, res, function () {
			res.redirect("/moviequotes");
		});
	});
});

// SHOW login form
router.get("/login", function (req, res) {
	res.render("authenticate/login");
});

// POST Login form handler
router.post("/login", passport.authenticate("local", {
	successRedirect: "/moviequotes",
	failureRedirect: "/login"
}), function (req, res) {
	res.send("login fun");
});

// Logout handler
router.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/moviequotes");
});

module.exports = router;