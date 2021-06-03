//Load express
const express = require("express");
const employees = express(); // creating the instance of express
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

employees.use(morgan("dev"));
employees.use(express.json());
employees.use(express.urlencoded({ extended: false }));
employees.use(cors());

//swagger
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Hotel-Management-System-employees',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./employees.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUi = require('swagger-ui-express');

employees.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//mongoose
require("./models/employee");
const Employee = mongoose.model("Employee");

//connecting mongodb with nodejs using mongoose. should be declared before listening command
mongoose.connect(
    process.env.DB_CONNECTION_STRING,
  {useUnifiedTopology: true, useNewUrlParser: true},//{useMongoClient: true},
  (req, res)=>{
    console.log("Connected to the Database");
  }
  );
  //mongoose.Promise = global.Promise;

employees.get("/", (req, res, next) => {
	res.send("Employee Management Service is up and running");
	next();
});

//create employees
employees.post("/employee", (req, res) => {
	var newEmployee = {
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		jobprofile: req.body.jobprofile,
		email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
		gender: req.body.gender,
		address: req.body.address
	};
	// created new employee with the attribute mentioned above
	var employee = new Employee(newEmployee);
	//save employee
	employee
		.save()
		.then(() => {
			console.log("New Employee created");
		})
		.catch((err) => {
			if (err) {
				console.log(err);
			}
		});
	res.send("A new employee is created");
});
/**
 * @swagger
 * /employee:
 *   post:
 *     summary: Add new employees
 *     description: Users can add employees using CRUD operations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: employee name
 *                 example: Akash
 *               jobprofile: 
 *                 type: string
 *                 description: job profile of employee
 *                 example: receptionist
 *               email:
 *                 type: string
 *                 description: email id of employee
 *                 example: abc@gmail.com
 *               phone:
 *                 type: number
 *                 description: phone number of employee
 *                 example: 9898989898
 *               age:
 *                 type: number
 *                 description: age
 *                 example: 27
 *               gender:
 *                 type: string
 *                 description: gender of employee
 *                 example: male
 *               address:
 *                 type: string
 *                 description: address of employee
 *                 example: Mumbai, Maharashtra, India
 *              
 *     responses:
 *       200:
 *         description: Adds a new employee
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
 *                          description: message for successful employee addition or else error message
 *                          example: New Employee Added Successfully
 */

//list all employees
employees.get("/employee", (req, res) => {
	Employee.find()
		.then((employee) => {
			res.json(employee);
		})
		.catch((err) => {
			throw err;
		});
});
/**
 * @swagger
 * /employee:
 *   get:
 *     summary: View all employees
 *     description: Retrieve all employees from database
 *     responses:
 *       200:
 *         description: A list of employees
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
 *               name:
 *                 type: string
 *                 description: employee name
 *                 example: Akash
 *               jobprofile: 
 *                 type: string
 *                 description: job profile of employee
 *                 example: receptionist
 *               email:
 *                 type: string
 *                 description: email id of employee
 *                 example: abc@gmail.com
 *               phone:
 *                 type: number
 *                 description: phone number of employee
 *                 example: 9898989898
 *               age:
 *                 type: number
 *                 description: age
 *                 example: 27
 *               gender:
 *                 type: string
 *                 description: gender of employee
 *                 example: male
 *               address:
 *                 type: string
 *                 description: address of employee
 *                 example: Mumbai, Maharashtra, India
 */

//list employee by id
employees.get("/employee/:employeeId", (req, res) => {
	Employee.findById(req.params.employeeId)
		.then((employee) => {
			// show employee
			if (employee) {
				res.json(employee);
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
 * /employee/:employeeId:
 *   get:
 *     summary: View a specific employee with the help of employee id.
 *     description: Retrieve a specific employee
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         description: ID of the employee
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: employee name
 *                 example: Akash
 *               jobprofile: 
 *                 type: string
 *                 description: job profile of employee
 *                 example: receptionist
 *               email:
 *                 type: string
 *                 description: email id of employee
 *                 example: abc@gmail.com
 *               phone:
 *                 type: number
 *                 description: phone number of employee
 *                 example: 9898989898
 *               age:
 *                 type: number
 *                 description: age
 *                 example: 27
 *               gender:
 *                 type: string
 *                 description: gender of employee
 *                 example: male
 *               address:
 *                 type: string
 *                 description: address of employee
 *                 example: Mumbai, Maharashtra, India
 */

//update employee by id
employees.put("/employee/:employeeId", (req, res) => {
	Employee.findByIdAndUpdate({_id:req.params.employeeId},req.body)
	.then(() => {
		//to display what room details are updated along with updated values
		Employee.findOne({_id:req.params.id}).then((employee)=>{
		res.status(201).send({
			message:"Employee updated"});
	})
		.catch((err) => {
			res.status(401).send({
				message:"Employee not updated"
			});
		});
});
});
/**
 * @swagger
 * /employee/:employeeId:
 *   put:
 *     summary: Update employee details of a specific employee
 *     description: update employee details in database
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         description: ID of the employee
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: employee name
 *                 example: Akash
 *               jobprofile: 
 *                 type: string
 *                 description: job profile of employee
 *                 example: receptionist
 *               email:
 *                 type: string
 *                 description: email id of employee
 *                 example: abc@gmail.com
 *               phone:
 *                 type: number
 *                 description: phone number of employee
 *                 example: 9898989898
 *               age:
 *                 type: number
 *                 description: age
 *                 example: 27
 *               gender:
 *                 type: string
 *                 description: gender of employee
 *                 example: male
 *               address:
 *                 type: string
 *                 description: address of employee
 *                 example: Mumbai, Maharashtra, India
 *              
 *     responses:
 *       201:
 *         description: It will update employee along with required paramaters.
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
 *                         example: Employee details have been updated
 *                       name:
 *                         type: string
 *                         description: Employee name
 *                         example: Akash
 *                       jobprofile:
 *                         type: string
 *                         description: Job Profile
 *                         example: receptionist
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
 *                         example: 26
 *                       gender:
 *                         type: string
 *                         description: gender
 *                         example: male
 *                       address:
 *                         type: string
 *                         description: address
 *                         example: Mumbai
 */

//delete employee
employees.delete("/employee/:employeeId", (req, res) => {
	Employee.findOneAndRemove(req.params.roomId)
		.then(() => {
			res.status(200).json({
				message: 'Employee Deleted'
			});
		})
		.catch((err) => {
			if (err) {
				res.status(401).json({
					message: 'Employee cannot be deleted'
				});
				console.log(err)
			}
		});
});
/**
 * @swagger
 * /employee/:employeeId:
 *   delete:
 *     summary: Delete a specific employee with the help of employee id.
 *     description: Delete a specific employee
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         description: ID of the employee
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deletes an employee
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
 *                          type: string
 *                          description: message for successful employee removal or else error message
 *                          example: Employee Deleted Successfully
 */
employees.listen(5000, () => {
	console.log("Employee management server running on localhost:5000");
});