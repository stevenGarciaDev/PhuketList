const mongoose = require("mongoose");
const Joi = require("joi");

const listItemSchema = new mongoose.Schema({
  taskName: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true
  },
  dateModified: {
    type: Date,
    default: Date.now,
    required: true
  },

});

const ListItem = mongoose.model("BucketList", listItemSchema);

function validateItem(list) {
  const schema = {
    taskName: Joi.string.min(5).max(50).required(),
    isCompleted: Joi.boolean.required(),
    dateCreated: Joi.date.required()
  };

  return Joi.validate(list, schema)
}

module.exports.BucketList = ListItem;
