var mongoose = require("mongoose");

var commentsSchema = new mongoose.Schema({
    commenttext: String,
    author: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Comments", commentsSchema);