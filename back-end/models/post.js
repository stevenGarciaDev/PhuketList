const mongoose = require('mongoose');
const Joi = require('Joi');

const postSchema = new mongoose.Schema({
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
  }
});

const Post = mongoose.model('Post', postSchema);

function validateUser(post) {
  const schema = {
    author: Joi.string().required(),
    content: Joi.string().max(144).required(),
    isAppropriate: Joi.boolean()
  };

  return Joi.validate(post, schema);
}

module.exports.Post = Post;
module.exports.validate = validatePost;;
