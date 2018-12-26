var express = require('express');
var router = express.Router();
//var moviequotes = require("../models/moviequotes");

// INDEX - show all movie quotes
// router.get("/moviequotes", function (req, res) {
//     res.render("/moviequotes");
// });

// Show collection of movie quotes
router.get("/", function (req, res, next) {
    //res.send("test");
    res.render("moviequotes/index", {
        title: "Name That Movie"
    });
});

// Show new movie quote form
router.get('/new', function (req, res, next) {
    res.render("moviequotes/new", {
        title: "Name That Move"
    });
});

// CREATE ROUTE
router.post("/", function (req, res) {
    // Create new quote
    res.redirect("/moviequotes");
});

module.exports = router;