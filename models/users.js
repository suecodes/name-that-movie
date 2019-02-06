/**
 *  Model - Users
 */

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    dateJoined: {
        type: Date,
        default: Date.now
    },
    email: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

// generating a hash to keep password secure
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Plugin to pass methods/functionality to user model
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Users", userSchema);