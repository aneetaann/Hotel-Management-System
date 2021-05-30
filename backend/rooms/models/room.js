const mongoose = require("mongoose");

mongoose.model("Room", {
    _id: mongoose.Schema.Types.ObjectId,
	roomnumber: {
		type: Number,
		required: true,
	},
	floor: {
		type: Number,
		required: true,
	},
    type: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
	price: {
		type: Number,
		required: true,
	},
    updatedOn: {type: Date, default: Date.now()}
});