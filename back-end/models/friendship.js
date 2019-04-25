const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['no connection', 'declined', 'accepted', 'pending'],
    default: 'no connection'
  },
  friends: [
    {
      id: mongoose.Schema.Types.ObjectId,
      name: String,
      photo: String,
    },
    {
      id: mongoose.Schema.Types.ObjectId,
      name: String,
      photo: String
    }
  ]
});

const Friendship = mongoose.model('Friendship', friendshipSchema);

module.exports.Friendship = Friendship;
