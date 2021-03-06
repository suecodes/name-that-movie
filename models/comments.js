/**
 *  Model - Comments 
 */

const mongoose = require("mongoose");

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