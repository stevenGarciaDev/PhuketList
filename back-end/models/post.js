const mongoose = require('mongoose');
const Joi = require('Joi');
const { commentSchema } = require('./comment');

const postSchema = new mongoose.Schema({
  topicID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ListItem',
    required: true
  },
    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    maxlength: 144,
    trim: true,
    required: true
  },
  photo: {
    type: String
  },
  isAppropriate: {
    type: Boolean,
    default: true
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
    required: true
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  comments: {
    type: [commentSchema],
    default: []
  }
});

const Post = mongoose.model('Post', postSchema);

function validate(post) {
  const schema = {
    author: Joi.string().required(),
    content: Joi.string().max(144).required(),
    isAppropriate: Joi.boolean(),
    dateCreated: Joi.date().required()
  };

  return Joi.validate(post, schema);
}

module.exports.Post = Post;
module.exports.validate = validate;
