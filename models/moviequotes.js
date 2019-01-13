var mongoose = require("mongoose");

var moviequotesSchema = new mongoose.Schema({
    moviename: String,
    moviequote: String,
    movieimage: String,
    screenwriter: String,
    year: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Moviequotes", moviequotesSchema);