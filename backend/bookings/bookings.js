//Load express
const express = require("express");
const bookings = express(); // creating the instance of express
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

bookings.use(morgan("dev"));
bookings.use(express.json());
bookings.use(express.urlencoded({ extended: false }));
bookings.use(cors());

require("./models/booking");
const Booking = mongoose.model("Booking");

//connecting mongodb with nodejs using mongoose. should be declared before listening command
mongoose.connect(
    process.env.DB_CONNECTION_STRING,
  {useUnifiedTopology: true, useNewUrlParser: true},//{useMongoClient: true},
  (req, res)=>{
    console.log("Connected to the Database");
  }
  );
  //mongoose.Promise = global.Promise;

  bookings.get("/", (req, res, next) => {
	res.send("Booking Management Service is up and running");
	next();
});

//create bookings
bookings.post("/booking", (req, res) => {
	var newBooking = {
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		jobprofile: req.body.jobprofile,
		email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
		gender: req.body.gender,
		address: req.body.address
	};
	// created new bookings with the attribute mentioned above
	var booking = new Employee(newBooking);
	//save bookings
	booking
		.save()
		.then(() => {
			console.log("New booking created");
		})
		.catch((err) => {
			if (err) {
				console.log(err);
			}
		});
	res.send("A new booking is created");
});

//list all bookings
bookings.get("/booking", (req, res) => {
	Booking.find()
		.then((booking) => {
			res.json(booking);
		})
		.catch((err) => {
			throw err;
		});
});

//list bookings by id
bookings.get("/booking/:bookingId", (req, res) => {
	Booking.findById(req.params.bookingId)
		.then((booking) => {
			// show booking
			if (booking) {
				res.json(booking);
			} else {
				res.sendStatus(404);
			}
		})
		.catch((err) => {
			if (err) {
				throw err;
			}
		});
});

//delete bookings
bookings.delete("/booking/:bookingId", (req, res) => {
	Booking.findOneAndRemove(req.params.bookingId)
		.then(() => {
			res.send("booking removed");
		})
		.catch((err) => {
			if (err) {
				throw err;
			}
		});
});

bookings.listen(6000, () => {
	console.log("bookings management server running on localhost:6000");
});