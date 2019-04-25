const mongoose = require("mongoose");
const auth = require('../middleware/auth');
const { Friendship } = require('../models/friendship');
const { User } = require("../models/user");
const express = require('express');
const router = express.Router();

router.get('/potentialFriends', async (req, res) => {
  // retrieve all users who are currently not friends
  const users = await User.find();
  console.log("Users retrieved are ... ", users);
  res.send(users);
});

router.post('/createRequest', (req, res) => {

});

module.exports = router;
