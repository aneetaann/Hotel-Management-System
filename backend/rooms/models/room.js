const mongoose = require("mongoose");

mongoose.model("Room", {
    _id: mongoose.Schema.Types.ObjectId,
	roomnumber: {
		type: Number,
		require: true,
	},
	floor: {
		type: Number,
		require: true,
	},
    type: {
        type: String,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    bathrooms:{
        type: Number,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
	price: {
		type: Number,
		require: true,
	},
    updatedOn: {type: Date, default: Date.now()}
});