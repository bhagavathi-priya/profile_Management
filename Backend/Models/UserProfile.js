const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name: String,
    Role: String,
    Email_Id: String
});

module.exports = mongoose.model("UserProfile", userSchema);