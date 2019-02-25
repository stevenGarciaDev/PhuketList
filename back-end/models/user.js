const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  bio: {
    type: String,
    maxlength: 255
  },
  isPrivateProfile: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isActiveAccount: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().min(10).max(100).required().email(),
    password: Joi.string().min(5).max(255).required(),
    bio: Joi.string().max(255),
    isPrivateProfile: Joi.boolean(),
    isAdmin: Joi.boolean(),
    isActiveAccount: Joi.boolean()
  };

  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;
