const { User, validateUser } = require("../models.ListItem");
const mongoose = require("mongoose");
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
    minlength: 10,
    maxlength: 100
  },
  bio: {
    type: String,
    required: false,
    maxlength: 255
  },
  isPrivateProfile: {
    type: Boolean,
    default: false,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  isActiveAccount: {
    type: Boolean,
    default: false,
    required: true
  }
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().min(10).max(100).required(),
    bio: Joi.string().max(255),
    isPrivateProfile: Joi.boolean().required(),
    isAdmin: Joi.boolean().required(),
    isActiveAccount: Joi.boolean().required()
  };

  require Joi.validate(user, schema);
}

module.exports.User = User;
