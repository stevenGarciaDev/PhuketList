const { User, validate } = require("../models/user");
const bcrypt = require('bcrypt');
const _ = require('lodash');
const config = require('config');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const { BucketList } = require("../models/bucketList");

// get a user,
// read from JSON web tokens; req.user._id
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) return res.status(404).send("User not found");

  res.send(user);
});

// Register a new user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');

  user = new User( _.pick(req.body, ['name', 'email', 'password']) );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const newList = new BucketList();
  newList.owner = user._id;
  await newList.save();

  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .header("access-control-expose-headers", "x-auth-token")
    .send({
      name: user.name,
      email: user.email,
      _id: user._id,
    });
});

router.get('/publicUsers', async (req, res) => {
  const users = await User.find({ isPrivateProfile: false });
  console.log('Users are', users);
  res.send(users);
});

router.post('/updateProfile/:user_id', async (req, res) => {
  // receive uploaded image and bio
  const {  bioText } = req.body;

  //const users = await User.updateOne();   // Find  the user from the db with the user_id
 
  //try {
   // await User.updateOne(
     //  { "user_id" : req.user_id },
     //  { $set: { "bio" : bioText } } // update the  user's profile
   // );


 //} catch (e) {
    //print(e);
 //}
  
  
  // save to db

  console.log("YES, !");
  res.send("sdsdsd");
});

module.exports = router;
