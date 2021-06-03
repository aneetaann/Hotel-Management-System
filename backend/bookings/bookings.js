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
		guestname: req.body.guestname,
		email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
		gender: req.body.gender,
		address: req.body.address,
		room: req.body.room,
		checkin: req.body.checkin,
		checkout: req.body.checkout,
		paymentmode: req.body.paymentmode,
		totalamount: req.body.totalamount
	};
	// created new bookings with the attribute mentioned above
	var booking = new Booking(newBooking);
	//save bookings
	booking
		.save()
		.then(() => {
			res.status(201).send({message:"Booking done"});
		})
		.catch((err) => {
			if (err) {
				res.status(401).send({message:"Booking Not done"});
				console.log(err);
			}
		});
	
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


//update booking by id
bookings.put("/booking/:bookingId", (req, res) => {
	Booking.findByIdAndUpdate({_id:req.params.bookingId},req.body)
	.then(() => {
		//to display what booking details are updated along with updated values
		Booking.findOne({_id:req.params.id}).then((booking)=>{
		res.status(201).json({
			message:"Booking updated"});
	})
		.catch((err) => {
			if (err) {
				res.status(401).json({
					message:"Booking Cannot be updated"});
			}
		});
});
});

//delete bookings
bookings.delete("/booking/:bookingId", (req, res) => {
	Booking.findOneAndRemove(req.params.bookingId)
		.then(() => {
			res.status(200).json({
				message: 'Booking Deleted'
			});
		})
		.catch((err) => {
			if (err) {
				res.status(401).json({
					message: 'Booking Cannot be deleted'
				});
				console.log(err)
			}
		});
});


bookings.listen(6000, () => {
	console.log("bookings management server running on localhost:6000");
});

