const { ListItem, validateItem } = require("../models/listItem");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get('/task', async (req, res) => {
	const searchKeyword = req.query.q;
	const listItem = await ListItem.find(
			{ "taskName": { $regex: '.*' + searchKeyword + '.*',
							$options: 'i'  }
			}, function(err,res){
			}).select('taskName').limit(5).exec().then(doc => {
			    res.send(doc); // <-- returns a pending promise
			});
});

// ALL THIS IS UNNECESSARY FOR NOW
// WILL DELETE IN FUTURE IF WE STILL HAVE NO USE FOR IT.

// Get a particular list item
//router.get('/:id', async (req, res) => {
//  const listItem = await ListItem.findById(req.params.id);
//  res.send(listItem);
//});

// Get all list items
//router.get('/', async (req, res) => {
//  const listItems = await ListItem.find().select('taskName');
//  res.send(listItems);
//});

//router.post('/', (req, res) => {
//  const { error } = validate(req.body);
//  if (error) return res.status(400).send(error.details[0].message);
//});

//router.put('/:id', (req, res) => {
//
//});

//router.delete('/:id', (req, res) => {
//
//});

module.exports = router;
