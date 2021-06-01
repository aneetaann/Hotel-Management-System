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

/*swagger
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Hotel-Management-System-rooms',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./rooms.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUi = require('swagger-ui-express');

rooms.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));*/

//mongoose
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

/**
 * @swagger
 * /room:
 *   post:
 *     summary: add new rooms
 *     description: users can add rooms using CRUD operations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomnumber:
 *                 type: number
 *                 description: room number.
 *                 example: 12
 *               floor: 
 *                 type: number
 *                 description: floor of room
 *                 example: 1
 *               type:
 *                 type: string
 *                 description: type of room
 *                 example: basic
 *               availability:
 *                 type: string
 *                 description: if room available
 *                 example: yes
 *               price:
 *                 type: number
 *                 description: cost of room
 *                 example: 1000
 *              
 *     responses:
 *       200:
 *         description: It will create a new room
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                         message:
 *                          type: strig
 *                          description: message for successful room creation or else error message
 *                          example: New Room Created Successfully
 */

//list all rooms
rooms.get("/room", (req, res) => {
	Room.find({})
		.then((room) => {
			// res.json(room);
			res.send(room)
		})
		.catch((err) => {
			throw err;
		});
});
/**
 * @swagger
 * /room:
 *   get:
 *     summary: Retrieve a list of all rooms
 *     description: Retrieve a list of rooms from rooms databse. Can be used for bookings.
 *     responses:
 *       200:
 *         description: A list of trains.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       roomnumber:
 *                         type: number
 *                         description: The room number.
 *                         example: 111
 *                       floor:
 *                         type: number
 *                         description: The room's floor location.
 *                         example: 1
 *                       type:
 *                         type: string
 *                         description: type of room
 *                         example: basic
 *                       availability:
 *                         type: string
 *                         description: if room is available
 *                         example: yes
 *                       price:
 *                         type: number
 *                         description: price of room.
 *                         example: 200
 */

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

//update room by id
rooms.put("/room/:roomId", (req, res) => {
	Room.findByIdAndUpdate({_id:req.params.roomId},req.body)
	.then(() => {
		//to display what room details are updated along with updated values
		Room.findOne({_id:req.params.id}).then((room)=>{
		res.status(201).send({
			message:"Room updated", room});
	})
		.catch((err) => {
			if (err) {
				throw err;
			}
		});
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