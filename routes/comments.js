var express = require('express');
var router = express.Router();
var Moviequotes = require("../models/moviequotes");
var Moviecomments = require("../models/comments");
var methodOverride = require("method-override");

router.use(methodOverride("_method"));

// CREATE - Save comments against the current movie quote ID record
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
                    comment.author = req.user.username;
                    // save comment
                    comment.save();
                    moviequotes.comments.push(comment);
                    moviequotes.save();
                    // Refresh page with new comment
                    res.redirect("/moviequotes/" + req.body.moviequoteid);
                }
            });
        }
    });
});

// // DESTROY - Remove movie comment from selected movie quote
// router.delete("/:id/comments/:commentid", function (req, res) {
//     console.log(req.params.commentid);
//     console.log(req.params.id);
//     //res.redirect("/moviequotes/" + req.params.id);
//     // Moviecomments.findByIdAndRemove(req.params.id, function (err) {
//     //     if (err) {
//     //         res.redirect("/moviequotes");
//     //     } else {
//     //         res.redirect("/moviequotes/" + req.body.moviequoteid);
//     //     }
//     // });
// });

module.exports = router;