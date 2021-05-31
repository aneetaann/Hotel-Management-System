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

//delete employee
employees.delete("/employee/:employeeId", (req, res) => {
	Employee.findOneAndRemove(req.params.roomId)
		.then(() => {
			res.send("Employee removed");
		})
		.catch((err) => {
			if (err) {
				throw err;
			}
		});
});

employees.listen(5000, () => {
	console.log("Employee management server running on localhost:5000");
});