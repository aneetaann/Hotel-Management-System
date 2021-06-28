const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require('../models/admin');

//Admin signup and auth
router.post('/signup', (req, res, next) => {
    Admin.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1){
                return res.status(409).json({
                    message: 'Mail already exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash)=>{
                    if (err) {
                        return res.status(500).json({
                            error:err
                        });
                    }         /*else{
                                    check("Name", "Please enter your name")
                                    .not()
                                    .isEmpty(),
                                    check("username","Please enter a valid username")
                                    .not()
                                    .isEmpty(),
                                    check("phone","Please enter a valid contact")
                                    .not()
                                    .isEmpty()
                                }*/
                    else{
                        const user = new Admin({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                        .save()
                        .then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: 'User created'
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error:err
                            });
                        });
                    }
                });
            }
        });
    });
/**
 * @swagger
 * /admin/signup:
 *   post:  
 *     summary: admin signup.
 *     tags:
 *      - admin
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            email: 
 *              type: string
 *            password:
 *               type: string
 *   responses:
 *    '200':
 *      description: "User Created"
 *    '500':
 *      description: Invalid input
 * 
 */

//Admin login and auth
router.post('/login', (req, res, next) => {
    Admin.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1){
            return res.status(200).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err){
                return res.status(200).json({
                    message: 'Auth failed'
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, 
                process.env.JWT_KEY_ADMIN,
                {
                    expiresIn: "1h"
                }
                );
                return res.status(200).json({
                    message: 'Auth Successful',
                    token: token
                });
            }
            res.status(200).json({
                message: 'Auth failed'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});
/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: admin login.
 *     tags:
 *      - admin
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *               type: string 
 *   responses:
 *    '200':
 *      description: "Auth Successful"
 *    '500':
 *      description: Auth failed
 */

//Admin delete
router.delete('/:userId', (req, res, next) => {
    Admin.remove({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Admin update
router.put("/profile/:userId", (req, res) => {
	Admin.findByIdAndUpdate({_id:req.params.userId},req.body)
	.then(() => {
		//to display what user details are updated along with updated values
		Admin.findOne({_id:req.params.id}).then(()=>{
		res.status(201).send({
			message:"Profile updated"});
	    })
		.catch((err) => {
			res.status(201).send({
				message:"Profile not updated"});
		});
    });
});

//Admin Profile
router.get("/profile", (req, res) => {
	Admin.find()
		.then((user) => {
			// show admin profile
			if (user) {
				res.json(user);
			} else {
				res.sendStatus(200);
			}
		})
		.catch((err) => {
			if (err) {
				throw err;
			}
		});
});

//Admin Profile by Id
router.get("/profile/:userId", (req, res) => {
	Admin.findById(req.params.userId)
		.then((user) => {
			// show admin
			if (user) {
				res.json(user);
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

module.exports = router;
