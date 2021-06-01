const mongoose = require("mongoose");

mongoose.model("Booking", {
    _id: mongoose.Schema.Types.ObjectId,
	guestname: {
		type: String,
		required: true,
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
    room: {
        type: String,
        required: true
    },
    checkin: {
        type: Date,
        required: true
    },
    checkout: {
        type: Date,
        required: true
    },
    paymentmode: {
        type: String,
        required: true
    },
    totalamount: {
        type: Number,
        required: true
    },
    updatedOn: {type: Date, default: Date.now()}
});