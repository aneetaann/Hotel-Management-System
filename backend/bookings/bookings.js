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

//swagger
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Hotel-Management-System-Bookings',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./bookings.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUi = require('swagger-ui-express');

bookings.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Add new bookings
 *     description: Users can add bookings using CRUD operations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               guestname:
 *                 type: strring
 *                 description: Guest Name
 *                 example: Akshay
 *               email: 
 *                 type: string
 *                 description: email
 *                 example: abc@gmail.com
 *               phone:
 *                 type: number
 *                 description: contact
 *                 example: 9797979797
 *               age:
 *                 type: number
 *                 description: age
 *                 example: 25
 *               address:
 *                 type: string
 *                 description: address
 *                 example: Delhi,India
 *               room:
 *                 type: string
 *                 description: room details
 *                 example: 1,1,Basic
 *               checkin:
 *                 type: date
 *                 description: check in date
 *                 example: 2021-05-05
 *               checkout:
 *                 type: date
 *                 description: check out date
 *                 example: 2021-05-07
 *               paymentmode:
 *                 type: string
 *                 description: mode of payment
 *                 example: online
 *               totalamount:
 *                 type: number
 *                 description: total amount
 *                 example: 1500
 *     responses:
 *       200:
 *         description: Creates a new booking
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
 *                          description: message for successful booking creation or else error message
 *                          example: New Booking Created Successfully
 */

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
/**
 * @swagger
 * /booking:
 *   get:
 *     summary: View all bookings
 *     description: Retrieve all bookings from database.
 *     responses:
 *       200:
 *         description: A list of bookings.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *             properties:
 *               guestname:
 *                 type: strring
 *                 description: Guest Name
 *                 example: Akshay
 *               email: 
 *                 type: string
 *                 description: email
 *                 example: abc@gmail.com
 *               phone:
 *                 type: number
 *                 description: contact
 *                 example: 9797979797
 *               age:
 *                 type: number
 *                 description: age
 *                 example: 25
 *               address:
 *                 type: string
 *                 description: address
 *                 example: Delhi,India
 *               room:
 *                 type: string
 *                 description: room details
 *                 example: 1,1,Basic
 *               checkin:
 *                 type: date
 *                 description: check in date
 *                 example: 2021-05-05
 *               checkout:
 *                 type: date
 *                 description: check out date
 *                 example: 2021-05-07
 *               paymentmode:
 *                 type: string
 *                 description: mode of payment
 *                 example: online
 *               totalamount:
 *                 type: number
 *                 description: total amount
 *                 example: 1500
 */

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
/**
 * @swagger
 * /booking/:bookingId:
 *   get:
 *     summary: View a specific booking with the help of booking id.
 *     description: Retrieve a specific booking.
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: ID of the booking
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               guestname:
 *                 type: strring
 *                 description: Guest Name
 *                 example: Akshay
 *               email: 
 *                 type: string
 *                 description: email
 *                 example: abc@gmail.com
 *               phone:
 *                 type: number
 *                 description: contact
 *                 example: 9797979797
 *               age:
 *                 type: number
 *                 description: age
 *                 example: 25
 *               address:
 *                 type: string
 *                 description: address
 *                 example: Delhi,India
 *               room:
 *                 type: string
 *                 description: room details
 *                 example: 1,1,Basic
 *               checkin:
 *                 type: date
 *                 description: check in date
 *                 example: 2021-05-05
 *               checkout:
 *                 type: date
 *                 description: check out date
 *                 example: 2021-05-07
 *               paymentmode:
 *                 type: string
 *                 description: mode of payment
 *                 example: online
 *               totalamount:
 *                 type: number
 *                 description: total amount
 *                 example: 1500
*/

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
/**
 * @swagger
 * /booking/:bookingId:
 *   put:
 *     summary: Update booking details of a specific booking
 *     description: update booking details in database
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: ID of the booking
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               guestname:
 *                 type: string
 *                 description: Guest Name
 *                 example: Akshay
 *               email: 
 *                 type: string
 *                 description: email id
 *                 example: abc@gmail.com
 *               phone:
 *                 type: number
 *                 description: contact
 *                 example: 9797979797
 *               age:
 *                 type: number
 *                 description: age
 *                 example: 25
 *               address:
 *                 type: string
 *                 description: address
 *                 example: Delhi,India
 *               room:
 *                 type: string
 *                 description: room details
 *                 example: 1,1,Basic
 *               checkin:
 *                 type: date
 *                 description: check in date
 *                 example: 2021-05-05
 *               checkout:
 *                 type: date
 *                 description: check out date
 *                 example: 2021-05-07
 *               paymentmode:
 *                 type: string
 *                 description: mode of payment
 *                 example: online
 *               totalamount:
 *                 type: number
 *                 description: total amount
 *                 example: 1500
 *              
 *     responses:
 *       201:
 *         description: It will update booking along with required paramaters.
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
 *                       message:
 *                         type: string
 *                         description: information if updated
 *                         example: booking details have been updated
 *                     properties:
 *		                 guestname:
 *                         type: string
 *                         description: Guest Name
 *                         example: Akshay
 *                       email: 
 *                         type: string
 *                         description: email
 *                         example: abc@gmail.com
 *                       phone:
 *                         type: number
 *                         description: contact
 *                         example: 9797979797
 *                       age:
 *                         type: number
 *                         description: age
 *                         example: 25
 *                       address:
 *                         type: string
 *                         description: address
 *                         example: Delhi,India
 *                       room:
 *                         type: string
 *                         description: room details
 *                         example: 1,1,Basic
 *                       checkin:
 *                         type: date
 *                         description: check in date
 *                         example: 2021-05-05
 *                       checkout:
 *                         type: date
 *                         description: check out date
 *                         example: 2021-05-07
 *                       paymentmode:
 *                         type: string
 *                         description: mode of payment
 *                         example: online
 *                       totalamount:
 *                         type: number
 *                         description: total amount
 *                         example: 1500
 */

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
/**
 * @swagger
 * /booking/:bookingId:
 *   delete:
 *     summary: Delete a specific booking with the help of booking id.
 *     description: Delete a specific booking.
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: ID of the booking
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deletes a booking
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
 *                          description: message for successful booking removal or else error message
 *                          example: Booking Deleted Successfully
 */

bookings.listen(6000, () => {
	console.log("bookings management server running on localhost:6000");
});

