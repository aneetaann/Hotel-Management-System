//Load express
const express = require("express");
const rooms = express(); // creating the instance of express
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

rooms.use(morgan("dev"));
rooms.use(express.json());
rooms.use(express.urlencoded({ extended: false }));
rooms.use(cors());

require("./models/room");
const Room = mongoose.model("Room");

//connecting mongodb with nodejs using mongoose. should be declared before listening command
mongoose.connect(
    process.env.DB_CONNECTION_STRING,
  {useUnifiedTopology: true, useNewUrlParser: true},//{useMongoClient: true},
  (req, res)=>{
    console.log("Connected to the Database");
  }
  );
  //mongoose.Promise = global.Promise;

rooms.get("/", (req, res, next) => {
	res.send("Room Management Service is up and running");
	next();
});

//create rooms
rooms.post("/room", (req, res) => {
	var newRoom = {
		_id: new mongoose.Types.ObjectId(),
		roomnumber: req.body.roomnumber,
		floor: req.body.floor,
		type: req.body.type,
        availability: req.body.availability,
        price: req.body.price
	};
	// created new room with the attribute mentioned above
	var room = new Room(newRoom);
	//save room
	room
		.save()
		.then(() => {
			console.log("New Room created");
		})
		.catch((err) => {
			if (err) {
				console.log(err);
			}
		});
	res.send("A new room is created");
});

//list all rooms
rooms.get("/room", (req, res) => {
	Room.find()
		.then((room) => {
			res.json(room);
		})
		.catch((err) => {
			throw err;
		});
});

//list room by id
rooms.get("/room/:roomId", (req, res) => {
	Room.findById(req.params.roomId)
		.then((room) => {
			// show room
			if (room) {
				res.json(room);
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

//delete room
rooms.delete("/room/:roomId", (req, res) => {
	Room.findOneAndRemove(req.params.roomId)
		.then(() => {
			res.send("Room removed");
		})
		.catch((err) => {
			if (err) {
				throw err;
			}
		});
});

rooms.listen(4000, () => {
	console.log("Room management server running on localhost:4000");
});