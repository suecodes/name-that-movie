/**
 *  Comments Router
 * 
 *  RESTful routing:
 *  CREATE  /           POST    Create (save) new commente and refresh page
 *  
 */

const wlogger = require("../utils/logger.js");
const express = require('express');
const router = express.Router();
const Moviequotes = require("../models/moviequotes");
const Moviecomments = require("../models/comments");
const methodOverride = require("method-override");

router.use(methodOverride("_method"));

// CREATE - Save comments against the current movie quote ID record
router.post("/", function (req, res) {
    Moviequotes.findById(req.body.moviequoteid, function (err, moviequotes) {
        if (err) {
            wlogger.error(err);
            res.redirect("/moviequotes");
        } else {
            Moviecomments.create(req.body.comment, function (err, comment) {
                if (err) {
                    wlogger.error(err);
                } else {
                    // add username and id to comment
                    comment.commenttext = req.body.moviecomment;
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
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

module.exports = router;