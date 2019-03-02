const { ListItem, validateItem } = require("../models/listItem");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Get all list items
router.get('/', async (req, res) => {
  const listItems = await ListItem.find().select('taskName');
  res.send(listItems);
});

// Get a particular list item
router.get('/:id', async (req, res) => {
  const listItem = await ListItem.findById(req.params.id);
  res.send(listItem);
});

router.post('/', (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});


module.exports = router;
