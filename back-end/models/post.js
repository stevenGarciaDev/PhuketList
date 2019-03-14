const mongoose = require('mongoose');
const Joi = require('Joi');

const postSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  content: {
    type: String
  }
});

module.exports
