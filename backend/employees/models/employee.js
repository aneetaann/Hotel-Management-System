const mongoose = require("mongoose");

mongoose.model("Employee", {
    _id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true,
	},
    jobprofile:{
        type: String,
        required: true
    },
	email: {
		type: String,
		required: true,
        unique: true
	},
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
	gender: {
		type: String,
		required: true,
	},
    address: {
        type: String,
        required: true
    },
    updatedOn: {type: Date, default: Date.now()}
});