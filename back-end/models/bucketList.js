const mongoose = require("mongoose");
const Joi = require("joi");
const listItemSchema = require("listItem");

const bucketListSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  listItems: [listItemSchema]
});

const BucketList = mongoose.model("BucketList", bucketListSchema);

function validateBucketList(list) {
  const schema = {
    ownerId: Joi.string().required
  }

  return Joi.validate(list, schema);
}

module.exports.BucketList = BucketList;
module.exports.validateBucketList = validateBucketList;
