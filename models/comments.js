/**
 *  Model - Comments 
 */

const mongoose = require("mongoose");
const Moviequotes = require("../models/moviequotes");
const Moviecomments = require("../models/comments");

const commentsSchema = new mongoose.Schema({
    commenttext: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Comments", commentsSchema);