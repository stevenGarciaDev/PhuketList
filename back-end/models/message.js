const mongoose = require('mongoose');
const Joi = require('Joi');
Joi.objectId = require('joi-objectid')(Joi);

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 144,
  },
  dateCreated: {
    type: Date,
    required: true
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports.Message = Message;
