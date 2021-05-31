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
                    } else {
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
//Admin login and auth
router.post('/login', (req, res, next) => {
    Admin.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err){
                return res.status(401).json({
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
            res.status(401).json({
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

module.exports = router;

/*
//create rooms
router.post("/room", (req, res) => {
	var newRoom = {
		_id: new mongoose.Types.ObjectId(),
		roomnumber: req.body.roomnumber,
		floor: req.body.floor,
		type: req.body.type,
		beds: req.body.beds,
		bathrooms: req.body.bathrooms,
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

//update Train

router.put('/trainupdate/:id',function(req,res){
    //get train no and find that into train db in order to update
   Train.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
       //for display user what trains details are updated along with updated values
        Train.findOne({_id:req.params.id}).then(function(train){
           res.status(201).send({
               message:'Train details has been updated please check details',
               train
           });
       });
   });
});

// for delete train details

router.delete('/traindelete/:id',function(req,res){
    const no=req.params.id
    try{
        //find train with the help of ID and remove from database
        Train.findByIdAndRemove(no,(err,val)=>{
            if(err){
                console.log(err)
            }else{
                if(val){
                    res.status(200).json({
                        message:'You have deleted this train from database',
                        val
                    })
                }else{
                    res.status(400).send('Unable to proceed please check train no')
                }
            }
        });
    }catch(err){
        res.status(500).json(err)
    }
});

//to get all trains

router.get('/trains', async function(req,res){

    try{
        const trains= await Train.find();
        res.status(200).json(trains)
    } catch(err){
        res.status(500).json(err)
    }
    
});

//to get particular train details

router.get('/trains/:id',function(req,res){
    const id=req.params.id;
    try{
        Train.find({Train_Number:req.params.id},(err,val)=>{
            if(err){
                console.log(err)
            }else{
                if(val){
                    res.status(200).json(val)
                }else{
                    res.status(401).json(err)
                }
            }
        });
    }catch(err){
        res.status(500).json(err)
    }
})*/
