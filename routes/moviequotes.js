/**
 *  Movie Quotes
 * 
 *  RESTful routing:
 *  INDEX   /moviequotes/index      GET     List collection of all movie quotes 
 *  NEW     /moviequotes/new        GET     Show new movie quote form
 *  CREATE  /moviequotes            POST    Create (save) new movie quote and redirect back to collection
 *  SHOW    /moviequotes/show       GET     Show info about selected movie quote
 *  EDIT    /moviequotes/:id/edit   GET Show edit form for selected movie quote
 *  UPDATE  /moviequotes/:id        PUT     Update selected movie quote
 *  DESTROY /moviequotes/:id        DELETE  Delete selected movie quote
 *  
 */

var express = require('express');
var router = express.Router();
var Moviequotes = require("../models/moviequotes");
var methodOverride = require("method-override");

router.use(methodOverride("_method"));

// INDEX - Show collection of movie quotes
router.get("/", function (req, res, next) {
    Moviequotes.find({}, function (err, allMovieQuotes) {
        if (err) {
            console.log(err);
        } else {
            res.render("moviequotes/index", {
                title: "Name That Movie",
                moviequotes: allMovieQuotes
            });
        }
    });
});

// NEW - Show new movie quote form
router.get('/new', function (req, res, next) {
    res.render("moviequotes/new", {
        title: "Name That Move"
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

    var newMovieQuote = {
        moviename: moviename,
        moviequote: moviequote,
        movieimage: movieimage,
        screenwriter: screenwriter,
        year: year
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

    Moviequotes.findById(req.params.id, function (err, foundMoviequote) {
        if (err) {
            console.log(err);
        } else {
            //Render show template with that movie quote
            res.render("moviequotes/show", {
                moviequotes: foundMoviequote
            });
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

module.exports = router;