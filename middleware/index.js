var Moviequotes = require("../models/moviequotes");

var middlewareObj = {};

// Checks if user is logged in 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

// Check if movie quote was created by logged in user - allow edits only if logged on user was original submitter
middlewareObj.checkMovieQuoteAuthor = function (req, res, next) {
    if (req.isAuthenticated()) {
        Moviequotes.findById(req.params.id, function (err, foundMovieQuote) {
            if (err) {
                console.log(err);
                res.redirect("/moviequotes");
            } else {
                if (typeof foundMovieQuote.author.id !== 'undefined') {
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
};

module.exports = middlewareObj;