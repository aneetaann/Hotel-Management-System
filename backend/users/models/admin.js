const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true, unique: true}, //add match attribute from email regex
    password: {type: String, required: true},
    createdOn: {type: Date, default: Date.now()}
});

module.exports = mongoose.model("Admin", userSchema);