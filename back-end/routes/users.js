const { User, validate } = require("../models/user");
const bcrypt = require('bcrypt');
const _ = require('lodash');
const config = require('config');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const { BucketList } = require("../models/bucketList");
const crypto =require( 'crypto');
const nodemailer = require('nodemailer');
const Sequelize =require( 'sequelize');
const Op = Sequelize.Op;
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

// Get public user by ID
router.get('/publicUsers/:id', async (req, res) => {
  const users = await User.find({ _id: req.params.id, isPrivateProfile: false })
  .select('name');
  res.send(users);
});



router.put('/updateProfile/:user_id', async (req, res) => {
  // receive uploaded image and bio

  try {
    console.log(req.body.bioText);

    const lll =  await User.collection.updateOne({email: req.params.user_id}, {$set: {bio: req.body.bioText}});

    console.log(req.params.user_id);
    //console.log(User.getUsers());
 } catch (e) {
    //print(e);
 }
   const users = await User.find( {email: req.params.user_id} , { bio: 1} );

  //console.log(lsl);
  res.send(users);
});

router.post('/forgotPassword', async (req,  res)=> {
  console.log(req.body.email);
  if(req.body.email === ''){
    res.status(400).send('email required');
  }
  let user = await User.findOne({ email: req.body.email });
  if(user){
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    await user.save();
    user.reserPasswordExpires= Date.now() + 360000;
    await user.save();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: 'list.phuket@gmail.com',
        pass: 'iLoveChocolate',
      },
    });
    const mailOptions = {
      from: 'list.phuket@gmail.com',
      to: `${user.email}`,
      subject: 'Link To Reset Password',
      text:
        'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
        + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
        + `http://localhost:3000/reset/${token}\n\n`
        + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    };
    console.log('sending mail');

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        console.log('here is the res: ', response);
        res.status(200).json('recovery email sent');
      }
    });
  }
  else{
    res.send("email not Found");
  }
});

router.get('/resetPassword',async (req, res) => {
  console.log(req.query.token);
  let user =await  User.findOne({resetPasswordToken: req.query.token});
  if(user){
    res.status(200).send({
      email: user.email,
      message: 'password reset link a-ok',
    });
  }
  else{
     console.error('password reset link is invalid or has expired');
      res.status(403).send('password reset link is invalid or has expired');
  }
});


router.get('/UserBio/:user_id', async (req, res) => {
  //const users = await User.find( {email: req.params.user_id} , { bio: 1} );
  const users = await User.find( {email: req.params.user_id},  { bio: 1}  );
  //console.log(lsl);
  res.send(users);
});




module.exports = router;
