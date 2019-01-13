var Moviequotes = require("../models/moviequotes");

var middlewareObj = {};

// Checks if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

// Check if movie quote was created by logged in user
middlewareObj.checkMovieQuoteAuthor = function (req, res, next) {
    console.log(req.user);
    if (req.isAuthenticated()) {
        Moviequotes.findById(req.params.id, function (err, foundMovieQuote) {
            if (err) {
                console.log(err);
                res.redirect("/moviequotes");
            } else {
                console.log("Author is " + foundMovieQuote.author.id);
                if (typeof foundMovieQuote.author.id !== 'undefined') {
                    if (foundMovieQuote.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        res.redirect("/moviequotes");
                    }
                } else {
                    res.redirect("/moviequotes");
                }
            }
        });
    } else {
        res.redirect("/moviequotes");
    }
};

module.exports = middlewareObj;