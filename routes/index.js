/**
 *  Landing Page and Authentication Routers
 * 
 *  RESTful routing:
 * 
 *  --- Landing page ---
 *  SHOW    /           GET     Display landing page and random quote for quiz
 *  
 *  --- Authentication ---
 *  SHOW	/register				GET		Display register page
 *  CREATE	/register				POST	Register user
 *  SHOW	/login					GET		Display login page
 *	CREATE	/login					POST	Login user 
 *          /logout					GET		Logs user out
 *  		/forgotpassword			GET		Display forgot password page
 * 			/forgotpassword			POST	Call routine to reset password
 * 			/resetpassword/:token	GET	Display reset password page
 */

var ntmpassword = "*******";
var ntmpassword = "namethatmovieteam@gmail.com";
var express = require('express');
var router = express.Router();
var Moviequotes = require("../models/moviequotes");

// Authentication
var passport = require("passport");
var passportLocal = require("passport-local");
var User = require("../models/users");

// Reset password libraries
var async = require('async');
var crypto = require('crypto');
var xoauth2 = require('xoauth2');

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
				quiz: Math.floor(Math.random() * 4),
				currentuser: req.user
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
		username: req.body.username,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email
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

// SHOW - Forgot password page
router.get("/forgotpassword", function (req, res) {
	res.render("authenticate/forgotpassword", {
		user: req.user
	});
});

// POST - Forgot password handler
router.post("/forgotpassword", function (req, res, next) {
	async.waterfall([
			function (done) {
				crypto.randomBytes(20, function (err, buf) {
					var token = buf.toString('hex');
					done(err, token);
				});
			},
			// Check if email address exists or not
			function (token, done) {
				User.findOne({
					email: req.body.email
				}, function (err, user) {
					if (!user) {
						//req.flash("error", "This email address does not exist.");
						return res.redirect("/forgotpassword");
					}
					user.resetPasswordToken = token;
					user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

					user.save(function (err) {
						done(err, token, user);
					});
				});
			},
			// Set up the transport service for sending emails
			function (token, user, done) {
				var nodemailer = require("nodemailer");

				var smtpTransport = nodemailer.createTransport("smtps://namethatmovieteam@gmail.com:" + encodeURIComponent(ntmpassword) + "@smtp.gmail.com:465");

				// Configure the email 
				var mailOptions = {
					to: user.email,
					from: ntmemail,
					subject: "Name That Movie Password Reset",
					text: "Forgot your password? No worries, click on the link below or copy and paste this in your browser to reset.\n\n" + "http://" + req.headers.host + "/resetpassword/" + token + "\n\n" +
						"If you did not make this request, please ignore this email.\n"
				};
				// Send the email
				smtpTransport.sendMail(mailOptions, function (err) {
					if (err) {
						console.log(err);
					} else {
						done(err, "done");
					}
				});
			}
		],
		function (err) {
			if (err) return next(err);
			res.redirect("/forgotpassword");
		});
});

// Reset password
router.get("/resetpassword/:token", function (req, res) {
	User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: {
			$gt: Date.now()
		}
	}, function (err, user) {
		if (!user) {
			//req.flash("error", "Password reset token is invalid or has expired.");
			return res.redirect("/forgotpassword");
		}
		res.render("resetpassword", {
			user: req.user
		});
	});
});

// TODO - Fix, not working atm
// POST - Reset passowrd
// router.post("/resetpassword/:token", function (req, res) {
// 	async.waterfall([
// 		function (done) {
// 			User.findOne({
// 				resetPasswordToken: req.params.token,
// 				resetPasswordExpires: {
// 					$gt: Date.now()
// 				}
// 			}, function (err, user) {
// 				if (!user) {
// 					req.flash("error", "Password reset token is invalid or has expired.");
// 					return res.redirect("back");
// 				}

// 				user.password = req.body.password;
// 				user.resetPasswordToken = undefined;
// 				user.resetPasswordExpires = undefined;

// 				user.save(function (err) {
// 					req.logIn(user, function (err) {
// 						done(err, user);
// 					});
// 				});
// 			});
// 		},
// 		function (user, done) {
// 			var smtpTransport = nodemailer.createTransport("smtps://namethatmovieteam@gmail.com:" + encodeURIComponent(ntmpassword) + "@smtp.gmail.com:465");
// 			var mailOptions = {
// 				to: user.email,
// 				from: "namethatmovieteam@gmail.com",
// 				subject: "Your password has been changed",
// 				text: "Hello,\n\n" +
// 					"This is a confirmation that the password for your Name That Movie account " + user.email + " has changed.\n"
// 			};
// 			smtpTransport.sendMail(mailOptions, function (err) {
// 				done(err);
// 			});
// 		}
// 	], function (err) {
// 		res.redirect("/");
// 	});
// });


// DISPLAY SEARCH - Search handler
router.get("/search", function (req, res, next) {
	console.log(req.body.searchcriteria);
	res.render("moviequotes/search");
});

// LOAD RESULTS - Return results matching search criteria
router.post("/searchresult", function (req, res) {
	console.log(req.body.searchcriteria);
	Moviequotes.find({
		$text: {
			$search: req.body.searchcriteria
		}
	}, function (err, searchResult) {
		if (err) {
			console.log(err);
			res.redirect("/moviequotes");
		} else {
			res.render("moviequotes/search", {
				title: "Name That Movie",
				moviequotes: searchResult,
				currentuser: req.user
			});
		}
	});
});

module.exports = router;