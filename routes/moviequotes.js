var express = require('express');
var router = express.Router();
var Moviequotes = require("../models/moviequotes");

// INDEX - Show collection of movie quotes
router.get("/", function (req, res, next) {

    // Moviequotes.remove({}, function (err) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log("Removed movies");
    // });

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
            console.log(newMovie);
            res.redirect("/moviequotes");
        }
    });
});

// DESTROY - Remove movie quote from collection
router.delete("/:id", function (req, res) {
    console.log(req.params.id);
    Moviequotes.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/moviequotes");
        } else {
            res.redirect("/moviequotes");
        }
    });
});


module.exports = router;