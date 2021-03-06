const express = require("express");
const userlogin = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv/config");
const PORT =process.env.PORT;

//swagger
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Hotel-Management-System-Users',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUi = require('swagger-ui-express');

userlogin.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const adminRoutes = require('./routes/admin-api');
const managerRoutes = require("./routes/manager-api");
const receptionistRoutes = require("./routes/receptionist-api");

//connecting mongodb with nodejs using mongoose. should be declared before listening command
mongoose.connect(
  process.env.DB_CONNECTION_STRING,
{useUnifiedTopology: true, useNewUrlParser: true},//{useMongoClient: true},
(req, res)=>{
  console.log("Connected to the Database");
}
);
//mongoose.Promise = global.Promise;

//listening to port

/*userlogin.listen(3000, ()=>{
  console.log("Listening to port 3000");
});*/

userlogin.listen(PORT,"0.0.0.0", ()=>
  console.log(`user microservice at port ${PORT}`)
);

userlogin.use(morgan("dev"));
userlogin.use(express.urlencoded({ extended: false }));
userlogin.use(express.json());

userlogin.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
userlogin.use("/admin", adminRoutes);
userlogin.use("/manager", managerRoutes);
userlogin.use("/receptionist", receptionistRoutes);

userlogin.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

userlogin.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = userlogin;