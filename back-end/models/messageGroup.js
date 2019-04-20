const mongoose = require('mongoose');

const messageGroupSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    required: true
  }
});

const MessageGroup = mongoose.model('MessageGroup', messageGroupSchema);

module.exports.MessageGroup = MessageGroup;
