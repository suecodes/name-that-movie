var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
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

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// Plugin to pass methods/functionality to user model
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Users", userSchema);