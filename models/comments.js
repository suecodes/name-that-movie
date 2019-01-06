var mongoose = require("mongoose");

var commentsSchema = new mongoose.Schema({
    commenttext: String,
    author: String
});

module.exports = mongoose.model("Comments", commentsSchema);