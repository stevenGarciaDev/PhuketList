const mongoose = require("mongoose");
const Joi = require("joi");

const FriendSchema = new mongoose.Schema({
    userid:{
        id: mongoose.Schema.Types.ObjectId
    },
    userEmail:{
        type: String
    },
    userPhoto:{
        type: String
    },
    status: {
        type: String,
        enum: ['sent', 'declined', 'accepted', 'pending','Add Friend'],
        default: ' Add Friend'
    }
});

const Friends = mongoose.model("Friends", FriendSchema);

module.exports.Friends = Friends;
module.exports.FriendSchema = FriendSchema;