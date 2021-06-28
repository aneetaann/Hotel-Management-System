const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Manager = require('../models/manager')

router.post('/signup', (req, res, next) => {
    Manager.find({email: req.body.email})
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
                    } else {
                        const user = new Manager({
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
 * /manager/signup:
 *   post:  
 *     summary: manager signup.
 *     tags:
 *      - manager
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

router.post('/login', (req, res, next) => {
    Manager.find({email: req.body.email})
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
                process.env.JWT_KEY_MANAGER,
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
 * /manager/login:
 *   post:
 *     summary: manager login.
 *     tags:
 *      - manager
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

router.delete('/:userId', (req, res, next) => {
    Manager.remove({_id: req.params.userId})
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

//Manager update
router.put("/profile/:userId", (req, res) => {
	Manager.findByIdAndUpdate({_id:req.params.userId},req.body)
	.then(() => {
		//to display what user details are updated along with updated values
		Manager.findOne({_id:req.params.id}).then(()=>{
		res.status(201).send({
			message:"Profile updated"});
	    })
		.catch((err) => {
			res.status(201).send({
				message:"Profile not updated"});
		});
    });
});

//Manager Profile
router.get("/profile", (req, res) => {
	Manager.find()
		.then((user) => {
			// show manager profile
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

//Manager Profile by Id
router.get("/profile/:userId", (req, res) => {
	Manager.findById(req.params.userId)
		.then((user) => {
			// show manager
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