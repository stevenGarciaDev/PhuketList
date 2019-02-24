const { ListItem, validateItem } = require("../models/listItem");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
  const listItems = await ListItem.find();
  res.send(listItems);
});

router.post("/", async (req, res) => {
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let listItem = new ListItem({
    taskName: req.body.taskName
  });

  listItem = await listItem.save();

  res.send(listItem);
});

router.put("/", async (req, res) => {
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let listItem = ListItem.findByIdAndUpdate( req.params.id, {
    taskName: req.body.taskName,
    dateModified: Date.now
  }, { new: true });

  if (!listItem) return res.status(404).send('The list item with the given ID was not found.');

  res.send(listItem);
});

router.delete("/", async (req, res) => {
  const listItem = await ListItem.findByIdAndRemove( req.params.id );

  if (!listItem) return res.status(404).send('The list item with the given ID was not found.');

  res.send(listItem);
});

module.exports = router;
