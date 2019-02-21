/**
 *  Movie Quotes Router
 *
 *  RESTful routing:
 *  INDEX   /moviequotes/index          GET     List collection of all movie quotes
 *  NEW     /moviequotes/new            GET     Show new movie quote form
 *  CREATE  /moviequotes                POST    Create (save) new movie quote and redirect back to collection
 *  SHOW    /moviequotes/show           GET     Show info about selected movie quote
 *  EDIT    /moviequotes/:id/edit       GET     Show edit form for selected movie quote
 *  UPDATE  /moviequotes/:id            PUT     Update selected movie quote
 *  DESTROY /moviequotes/:id            DELETE  Delete selected movie quote
 *  SORT    /moviequotes/sort           GET     Display moviequotes by name or year
 *  DESTROY /:id/comments/:commentid    DELETE Delete selected comment
 *
 */

const wlogger = require("../utils/logger.js");
const express = require("express");
const router = express.Router();
const Moviequotes = require("../models/moviequotes");
const Moviecomments = require("../models/comments");
const methodOverride = require("method-override");
const formatDate = require("../public/javascripts/formatDate");
const middleware = require("../middleware");

const APP_NAME = "Name That Movie";

router.use(methodOverride("_method"));

// middlware

// Check if movie quote was created by logged in user - allow edits only if logged on user was original submitter
function checkMovieQuoteAuthor(req, res, next) {
  if (req.isAuthenticated()) {
    Moviequotes.findById(req.params.id, function(err, foundMovieQuote) {
      if (err) {
        wlogger.error(err);
        res.redirect("/moviequotes");
      } else {
        if (typeof foundMovieQuote.author.id !== "undefined") {
          if (foundMovieQuote.author.id.equals(req.user._id)) {
            next();
          } else {
            // TODO - Possibly display message to user, that original author can edit ??
            res.redirect("/moviequotes/" + req.params.id);
          }
        } else {
          res.redirect("/moviequotes/" + req.params.id);
        }
      }
    });
  } else {
    res.redirect("/moviequotes/" + req.params.id);
  }
}

// INDEX - Show collection of movie quotes
router.get("/", function(req, res, next) {
  Moviequotes.find({}, function(err, allMovieQuotes) {
    if (err) {
      wlogger.error(err);
    } else {
      res.render("moviequotes/index", {
        title: APP_NAME,
        moviequotes: allMovieQuotes,
        currentuser: req.user
      });
    }
  });
});

// SORT - Sort by moviename or year
router.get("/sort", function(req, res, next) {
  // Get value of SortBy dropdown list
  var sortBy = {};
  sortBy[req.query.value] = 1;

  // Get data sorted by selected value and display
  Moviequotes.find({}, function(err, allMovieQuotes) {
    if (err) {
      wlogger.error(err);
    } else {
      res.render("moviequotes/index", {
        title: APP_NAME,
        moviequotes: allMovieQuotes
      });
    }
  }).sort(sortBy);
});

// NEW - Show new movie quote form
router.get("/new", function(req, res, next) {
  res.render("moviequotes/new", {
    title: APP_NAME,
    currentuser: req.user
  });
});

// CREATE - Save to db and redirect back to index
router.post("/", function(req, res) {
  // Get data from the form and add to array
  var moviename = req.body.moviename;
  var moviequote = req.body.moviequote;
  var movieimage = req.body.movieimage;
  var screenwriter = req.body.screenwriter;
  var year = req.body.movieyear;
  var author = {
    id: req.user._id,
    username: req.user.username
  };

  var newMovieQuote = {
    moviename: moviename,
    moviequote: moviequote,
    movieimage: movieimage,
    screenwriter: screenwriter,
    year: year,
    author: author
  };

  // Create new movie and save to DB
  Moviequotes.create(newMovieQuote, function(err, newMovie) {
    if (err) {
      wlogger.error(err);
      req.flash(
        "error",
        "Your movie quote failed to be added. Please try again."
      );
    } else {
      // success, redirect back to movie quotes collection
      req.flash("success", "Your movie quote has been added sucessfully.");
      res.redirect("/moviequotes");
    }
  });
});

// SHOW - Show information about one quote
router.get("/:id", function(req, res) {
  //Find the movie quote with the provided ID
  Moviequotes.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundMovieQuote) {
      if (err) {
        wlogger.error(err);
      } else {
        //Render show template with that movie quote
        res.render("moviequotes/show", {
          moviequotes: foundMovieQuote,
          formatDate: formatDate,
          currentuser: req.user
        });
      }
    });
});

// EDIT - Show edit form for selected movie quote
router.get("/:id/edit", checkMovieQuoteAuthor, function(req, res) {
  Moviequotes.findById(req.params.id, function(err, foundMoviequote) {
    res.render("moviequotes/edit", {
      moviequotes: foundMoviequote
    });
  });
});

// UPDATE - Update selected movie quote
router.put("/:id", function(req, res) {
  Moviequotes.findByIdAndUpdate(req.params.id, req.body, function(
    err,
    updateMoviequotes
  ) {
    if (err) {
      res.redirect("/moviequotes");
    } else {
      req.flash("success", "Your movie quote has been updated sucessfully.");
      res.redirect("/moviequotes/" + req.params.id);
    }
  });
});

// DESTROY - Remove movie quote from collection
router.delete("/:id", function(req, res) {
  Moviequotes.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/moviequotes");
    } else {
      req.flash("success", "Your movie quote has been deleted.");
      res.redirect("/moviequotes");
    }
  });
});

// DESTROY - Remove movie comment from selected movie quote
router.delete("/:id/comments/:commentid", function(req, res) {
  // Delete the comment (subdocument)
  Moviecomments.findByIdAndRemove(req.params.commentid, function(err) {
    if (err) {
      wlogger.error(err);
      res.redirect("/moviequotes");
    } else {
      // Then remove comment (subdocument) from movie quotes collection
      Moviequotes.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            comments: req.params.commentid
          }
        },
        function(err, data) {
          if (err) {
            wlogger.error(err);
          } else {
            req.flash("success", "Your comment has been deleted.");
            res.redirect("/moviequotes/" + req.params.id);
          }
        }
      );
    }
  });
});

module.exports = router;
