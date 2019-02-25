/**
 *  Landing Page, Authentication and Search Routers
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
 *
 * --- Search ---
 * SHOW		/search					GET		Display Search page
 * CREATE	/searchresult			POST	Get data and display results
 *
 */

const APP_NAME = "Name That Movie";
const APP_EMAIL = "namethatmovieteam@gmail.com";
const RANDOM_QUIZ_SIZE = 4;

var wlogger = require("../utils/logger.js");
var express = require("express");
var router = express.Router();
var Moviequotes = require("../models/moviequotes");

var passport = require("passport");
var User = require("../models/users");

// Reset password libraries - tokens
var async = require("async");
var crypto = require("crypto");

/* ------------------- */
/* Landing Page Routes */
/* ------------------- */

// SHOW home page and random quote
router.get("/", function(req, res, next) {
  // Get random sampling of quotes
  Moviequotes.aggregate([
    {
      $sample: {
        size: RANDOM_QUIZ_SIZE
      }
    }
  ]).exec(function(err, result) {
    if (err) {
      wlogger.error(err);
    } else {
      // Render page and return result
      //console.log("Total found: " + result.length);

      res.render("landing", {
        title: APP_NAME,
        result: result,
        quiz:
          result.length === 0
            ? 0
            : Math.floor(Math.random() * RANDOM_QUIZ_SIZE),
        currentuser: req.user
      });
    }
  });
});

/* --------------------- */
/* Authentication Routes */
/* --------------------- */

// SHOW register form
router.get("/register", function(req, res) {
  res.render("authenticate/register");
});

// POST Sign Up Logic Handler
router.post("/register", function(req, res) {
  var newUser = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email
  });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash("error", "Username already exists");
      wlogger.info("Username already exists");
      return res.render("authenticate/register");
    }
    passport.authenticate("local")(req, res, function() {
      wlogger.info("New user has registered an account: " + user.username);
      res.redirect("/moviequotes");
    });
  });
});

// SHOW login form
router.get("/login", function(req, res) {
  res.render("authenticate/login");
});

router.get("/termsofservice", function(req, res) {
  res.render("authenticate/termsofservice");
});

router.get("/privacypolicy", function(req, res) {
  res.render("authenticate/privacypolicy");
});

// POST Login form handler
router.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      wlogger.info(err);
      return next(err);
    }
    if (!user) {
      req.flash(
        "error",
        "Sorry we could not find an account with the email you entered."
      );
      return res.redirect("/login");
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      wlogger.info(user.username + " has logged in");
      return res.redirect("/moviequotes");
    });
  })(req, res, next);
});

// Logout handler
router.get("/logout", function(req, res) {
  wlogger.info("User has logged out");
  req.logout();
  res.redirect("/moviequotes");
});

// SHOW - Forgot password page
router.get("/forgotpassword", function(req, res) {
  res.render("authenticate/forgotpassword", {
    user: req.user
  });
});

// POST - Forgot password handler
router.post("/forgotpassword", function(req, res, next) {
  async.waterfall(
    [
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      // Check if email address exists or not
      function(token, done) {
        User.findOne(
          {
            email: req.body.email
          },
          function(err, user) {
            if (!user) {
              req.flash("error", "This email address does not exist.");
              return res.redirect("/forgotpassword");
            }
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function(err) {
              done(err, token, user);
            });
          }
        );
      },
      // Set up the transport service for sending emails
      function(token, user, done) {
        var nodemailer = require("nodemailer");

        var smtpTransport = nodemailer.createTransport({
          host: process.env.GMAILHOST,
          service: "Gmail",
          auth: {
            user: APP_EMAIL,
            pass: process.env.GMAILPW
          }
        });

        // Configure the email
        var mailOptions = {
          to: user.email,
          from: APP_EMAIL,
          subject: APP_NAME + " Password Reset",
          text:
            "Forgot your password? No worries, click on the link below or copy and paste this in your browser to reset.\n\n" +
            "http://" +
            req.headers.host +
            "/resetpassword/" +
            token +
            "\n\n" +
            "If you did not make this request, please ignore this email.\n"
        };
        // Send the email
        smtpTransport.sendMail(mailOptions, function(err) {
          if (err) {
            wlogger.error(err);
          } else {
            req.flash("success", "Please check your email.");
            done(err, "done");
          }
        });
      }
    ],
    function(err) {
      if (err) return next(err);
      res.redirect("/forgotpassword");
    }
  );
});

// Reset password
router.get("/resetpassword/:token", function(req, res) {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: {
        $gt: Date.now()
      }
    },
    function(err, user) {
      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        return res.redirect("/forgotpassword");
      }
      res.render("authenticate/resetpassword", {
        user: req.user
      });
    }
  );
});

// POST - Reset password
router.post("/resetpassword/:token", function(req, res, next) {
  async.waterfall(
    [
      function(done) {
        User.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {
              $gt: Date.now()
            }
          },
          function(err, user) {
            if (!user) {
              wlogger.info("Password reset token is invalid or has expired.");
              req.flash(
                "error",
                "Password reset token is invalid or has expired."
              );
              return res.redirect("back");
            }
            if (req.body.password === req.body.confirm) {
              // Hash password in db
              //user.password = req.body.password;
              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;

              user.save(function(err) {
                if (err) {
                  wlogger.error(err);
                }
                req.login(user, function(err) {
                  if (err) {
                    return next(err);
                  }
                  done(null, user);
                });
              });
            } else {
              wlogger.info("Passwords do not match.");
              req.flash("error", "Passwords do not match.");
              return res.redirect("back");
            }
          }
        );
      },
      function(user, done) {
        var nodemailer = require("nodemailer");

        var smtpTransport = nodemailer.createTransport({
          host: process.env.GMAILHOST,
          service: "Gmail",
          auth: {
            user: APP_EMAIL,
            pass: process.env.GMAILPW
          }
        });
        var mailOptions = {
          to: user.email,
          from: APP_EMAIL,
          subject: "Your password has been changed",
          text:
            "Hello,\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n"
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash("success", "Your password has been changed!");
          wlogger.info(
            "Password for user " + user.username + " has been changed."
          );
          done(err);
        });
      }
    ],
    function(err) {
      res.redirect("/moviequotes");
    }
  );
});

/* ------------- */
/* Search Routes */
/* ------------- */

// DISPLAY SEARCH - Search handler
router.get("/search", function(req, res, next) {
  res.render("moviequotes/search");
});

// LOAD RESULTS - Return results matching search criteria
router.post("/searchresult", function(req, res) {
  Moviequotes.find(
    {
      $text: {
        $search: req.body.searchcriteria
      }
    },
    function(err, searchResult) {
      if (err) {
        res.redirect("/moviequotes");
      } else {
        res.render("moviequotes/search", {
          title: APP_NAME,
          moviequotes: searchResult,
          currentuser: req.user
        });
      }
    }
  );
});

module.exports = router;
