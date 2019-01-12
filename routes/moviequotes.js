/**
 *  Movie Quotes
 * 
 *  RESTful routing:
 *  INDEX   /moviequotes/index      GET     List collection of all movie quotes 
 *  NEW     /moviequotes/new        GET     Show new movie quote form
 *  CREATE  /moviequotes            POST    Create (save) new movie quote and redirect back to collection
 *  SHOW    /moviequotes/show       GET     Show info about selected movie quote
 *  EDIT    /moviequotes/:id/edit   GET     Show edit form for selected movie quote
 *  UPDATE  /moviequotes/:id        PUT     Update selected movie quote
 *  DESTROY /moviequotes/:id        DELETE  Delete selected movie quote
 *  SORT    /moviequotes/sort       GET     Display moviequotes by name or year
 *  
 */

var express = require('express');
var router = express.Router();
var Moviequotes = require("../models/moviequotes");
var Moviecomments = require("../models/comments");
var methodOverride = require("method-override");
var mongoose = require('mongoose');
var formatDate = require("../formatDate");

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

    Moviequotes.findById(req.params.id).populate("comments").exec(function (err, foundMovieQuote) {
        if (err) {
            console.log(err);
        } else {
            //Render show template with that movie quote
            res.render("moviequotes/show", {
                moviequotes: foundMovieQuote,
                formatDate: formatDate
            });
        }
    });
});

// EDIT - Show edit form for selected movie quote
router.get("/:id/edit", function (req, res) {
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

    // Then delete the orphan comments for the deleted quote
    // Moviecomments.remove({
    //     _id: {
    //         $in: req.moviequotes.comments
    //     }
    // }, function (err) {
    //     if (err) {
    //         res.redirect("/moviequotes");
    //     } else {
    //         Moviequotes.findByIdAndRemove(req.params.commentid, function (err) {
    //             if (err) {
    //                 res.redirect("/moviequotes");
    //             }
    //         });
    //         res.redirect("/moviequotes");
    //     }
    // });
});


// DESTROY - Remove movie comment from selected movie quote
router.delete("/:id/comments/:commentid", function (req, res) {
    // Delete comments (subdocument)
    Moviecomments.findByIdAndRemove(req.params.commentid, function (err) {
        if (err) {
            console.log(err);
            res.redirect("/moviequotes");
        } else {
            //remove comment id from campgrounds db
            Moviequotes.findByIdAndUpdate(req.params.id, {
                $pull: {
                    comments: req.params.commentid
                }
            }, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/moviequotes");
                }
            });
        }
    });

    // console.log("Now deleteing the comment: " + req.params.commentid);
    // Moviecomments.findByIdAndRemove(req.params.commentid, function (err) {
    //     if (err) {
    //         res.redirect("/moviequotes");
    //     } else {
    //         // Remove comment ID from Moviequotes collection
    //         // Moviequotes.findOneAndUpdate(req.params.id, {
    //         //     $pull: {
    //         //         comments: mongoose.Types.ObjectId(req.params.commentid)
    //         //     }
    //         // }, function (err, data) {
    //         //     if (err) {
    //         //         return res.send('error in deleting comment');
    //         //     }
    //         //     res.send(data);
    //         // });
    //         // Then find the document and delete the reference to the comment
    //         Moviequotes.findOne(req.params.id, function (err, movie) {
    //             if (err) {
    //                 res.redirect("/moviequotes");
    //             } else {
    //                 console.log("=============");
    //                 console.log("Found record");
    //                 console.log("Now deleteing the sub comment: " + req.params.commentid);
    //                 console.log("=============");
    //                 Moviequotes.update({
    //                     _id: req.params.id
    //                 }, {
    //                     $pull: {
    //                         "comments": mongoose.Types.ObjectId(req.params.commentid)
    //                     }
    //                 });
    //                 res.redirect("/moviequotes/" + req.params.id);
    //             }
    //         });

    //     }
    // });
});



// CREATE - Save to db and redirect back to index
// router.post("/comments", function (req, res) {
//     // Get data from the form and add to array
//     console.log("This a comment");
//     // Create new movie and save to DB
//     res.render("this is a post");
// });

module.exports = router;


/*

{ "_id" : ObjectId("5c398b5beaa1f9924e2fb30e"), "comments" : [ ObjectId("5c399243b010df940268d5a2"), ObjectId("5c399256b010df940268d5a4"), ObjectId("5c3996922f60fd95c0b68f37"), ObjectId("5c3996da2f60fd95c0b68f38"), ObjectId("5c39ab23f176e596fa6e42ca"), ObjectId("5c39ab24f176e596fa6e42cb"), ObjectId("5c39ab9d5a171797c3414388") ], "moviename" : "Love Story", "moviequote" : "Love means never having to say you're sorry.", "screenwriter" : "Erich Segal", "year" : "1970", "__v" : 7 }


 {
    "_id": ObjectId("5c398b5beaa1f9924e2fb30e"),
    "comments": [ObjectId("5c399243b010df940268d5a2"), ObjectId("5c399256b010df940268d5a4"), ObjectId("5c3996922f60fd95c0b68f37"), ObjectId("5c3996da2f60fd95c0b68f38")],
    "moviename": "Love Story",
    "moviequote": "Love means never having to say you're sorry.",
    "screenwriter": "Erich Segal",
    "year": "1970",
    "__v": 4
} {
    "_id": ObjectId("5c398b85eaa1f9924e2fb30f"),
    "comments": [],
    "moviename": "Braveheart",
    "moviequote": "They may take our lives, but they'll never take our freedom!",
    "screenwriter": "Randall Wallace",
    "year": "1995",
    "__v": 0
} {
    "_id": ObjectId("5c398badeaa1f9924e2fb310"),
    "comments": [],
    "moviename": "In the Heat of the Night",
    "moviequote": "They call me Mister Tibbs!",
    "screenwriter": "Stirling Silliphant",
    "year": "1967",
    "__v": 0
} {
    "_id": ObjectId("5c399b5a23cfe0968bb8f4ee"),
    "comments": [],
    "moviename": "Test",
    "moviequote": "Test",
    "screenwriter": "Test",
    "year": "1931",
    "__v": 0
} {
    "_id": ObjectId("5c399b6b23cfe0968bb8f4ef"),
    "comments": [],
    "moviename": "Test2",
    "moviequote": "Test2",
    "screenwriter": "Test2",
    "year": "1956",
    "__v": 0
}


{
    "_id": ObjectId("5c39ab23f176e596fa6e42ca"),
    "dateCreated": ISODate("2019-01-12T08:53:55.041Z"),
    "__v": 0,
    "author": "Joe Smith",
    "commenttext": "This is a comment"
} */