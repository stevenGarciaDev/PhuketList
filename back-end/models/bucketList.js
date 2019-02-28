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

function validateBucketList(list) {
  const schema = {
    owner: Joi.objectid().required
  }

  return Joi.validate(list, schema);
}

module.exports.BucketList = BucketList;
module.exports.validateBucketList = validateBucketList;
