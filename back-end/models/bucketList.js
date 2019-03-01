const mongoose = require("mongoose");
const Joi = require("joi");
const { listItemSchema } = require("./listItem");

const bucketListSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  listItems: {
    type: [listItemSchema],
    default: []
  }
});

const BucketList = mongoose.model("BucketList", bucketListSchema);

module.exports.BucketList = BucketList;
