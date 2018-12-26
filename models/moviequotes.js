var mongoose = require("mongoose");

var moviequotesSchema = new mongoose.Schema({
    moviename: String,
    moviequote: String,
    movieimage: String,
    screenwriter: String,
    year: String,
});

module.exports = mongoose.model("Moviequotes", moviequotesSchema);