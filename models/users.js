/**
 *  Model - Users
 */

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require('bcrypt-nodejs');
var wlogger = require("../utils/logger.js");

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

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// hash password
// userSchema.pre("save", function (next) {
//     var user = this;
//     var SALT_FACTOR = 5;
//     console.log("one");
//     if (!user.isModified("password")) return next();
//     console.log("two");
//     bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
//         if (err) return next(err);
//         console.log("three");
//         bcrypt.hash(user.password, salt, null, function (err, hash) {
//             if (err) return next(err);
//             console.log("four");
//             user.password = hash;
//             user.salt = hash;
//             next();
//         });
//     });
// });

// Plugin to pass methods/functionality to user model
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Users", userSchema);