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

var express = require('express');
var router = express.Router();
var Moviequotes = require("../models/moviequotes");
var Moviecomments = require("../models/comments");
var methodOverride = require("method-override");
var formatDate = require("../formatDate");
var middleware = require("../middleware");

router.use(methodOverride("_method"));

// INDEX - Show collection of movie quotes
router.get("/", function (req, res, next) {
    Moviequotes.find({}, function (err, allMovieQuotes) {
        if (err) {
            console.log(err);
        } else {
            res.render("moviequotes/index", {
                title: "Name That Movie",
                moviequotes: allMovieQuotes,
                currentuser: req.user
            });
        }
    });
});

// SORT - Sort by moviename or year
router.get("/sort", function (req, res, next) {
    // Get value of SortBy dropdown list
    var sortBy = {};
    sortBy[req.query.value] = 1;

    // Get data sorted by selected value and display
    Moviequotes.find({}, function (err, allMovieQuotes) {
        if (err) {
            console.log(err);
        } else {
            res.render("moviequotes/index", {
                title: "Name That Movie",
                moviequotes: allMovieQuotes
            });
        }
    }).sort(sortBy);
});

// NEW - Show new movie quote form
router.get('/new', function (req, res, next) {
    res.render("moviequotes/new", {
        title: "Name That Move",
        currentuser: req.user
    });
});

// CREATE - Save to db and redirect back to index
router.post("/", function (req, res) {
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
    Moviequotes.create(newMovieQuote, function (err, newMovie) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to movie quotes collection
            res.redirect("/moviequotes");
        }
    });
});

// SHOW - Show information about one quote
router.get("/:id", function (req, res) {
    //Find the movie quote with the provided ID
    Moviequotes.findById(req.params.id).populate("comments").exec(function (err, foundMovieQuote) {
        if (err) {
            console.log(err);
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
router.get("/:id/edit", middleware.checkMovieQuoteAuthor, function (req, res) {
    Moviequotes.findById(req.params.id, function (err, foundMoviequote) {
        res.render("moviequotes/edit", {
            moviequotes: foundMoviequote
        });
    });
});

// UPDATE - Update selected movie quote
router.put("/:id", function (req, res) {
    Moviequotes.findByIdAndUpdate(req.params.id, req.body, function (err, updateMoviequotes) {
        if (err) {
            res.redirect("/moviequotes");
        } else {
            res.redirect("/moviequotes/" + req.params.id);
        }
    });
});

// DESTROY - Remove movie quote from collection
router.delete("/:id", function (req, res) {
    Moviequotes.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/moviequotes");
        } else {
            res.redirect("/moviequotes");
        }
    });
});

// DESTROY - Remove movie comment from selected movie quote
router.delete("/:id/comments/:commentid", function (req, res) {
    // Delete the comment (subdocument)
    Moviecomments.findByIdAndRemove(req.params.commentid, function (err) {
        if (err) {
            console.log(err);
            res.redirect("/moviequotes");
        } else {
            // Then remove comment (subdocument) from movie quotes collection
            Moviequotes.findByIdAndUpdate(req.params.id, {
                $pull: {
                    comments: req.params.commentid
                }
            }, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/moviequotes/" + req.params.id);
                }
            });
        }
    });
});

module.exports = router;