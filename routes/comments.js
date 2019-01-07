var express = require('express');
var router = express.Router();
var Moviequotes = require("../models/moviequotes");
var Moviecomments = require("../models/comments");
var methodOverride = require("method-override");

router.use(methodOverride("_method"));

// CREATE - Save comments against the movie quote ID record
router.post("/", function (req, res) {
    Moviequotes.findById(req.body.moviequoteid, function (err, moviequotes) {
        if (err) {
            console.log(err);
            res.redirect("/moviequotes");
        } else {
            Moviecomments.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.commenttext = req.body.moviecomment;
                    comment.author = "Joe Smith"; // To do - get username
                    // save comment
                    comment.save();
                    moviequotes.comments.push(comment);
                    moviequotes.save();
                    // req.flash("success", "Successfully added comment");
                    res.redirect("/moviequotes/" + req.body.moviequoteid);
                }
            });
        }
    });
});

module.exports = router;