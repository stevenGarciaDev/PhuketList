const { BucketList, validateBucketList } = require("../models/bucketList");
const { ListItem } = require("../models/listItem");
const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();

// req.params.id is the user id

router.get('/:id', auth, async (req, res) => {
  const listItems = await BucketList
    .find({ owner: req.params.id })
    .select('listItems');
  res.send(listItems);
});

// Create a new List item
router.post('/', auth, (req, res) => {
  console.log("Got the request");
  const { error } = validateBucketList(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newItem = findOrCreateTask(req.body.taskName);
  const bucketList = addTask(req.param.id, newItem);

  res.send(bucketList.listItems);
});

// Update a List item in the Bucket List
// so should get
// req.params.id     => bucket list id
// req.body.prev_id  => previous list item id
// req.body.taskName => updated task name
router.put('/', auth, (req, res) => {
  const { error } = validateBucketList(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // get the previous list item as to remove it from bucket list
  let bucketList = removeTask(req.params.id, req.body.prev_id , req.body.taskName);

  let listItem = findOrCreate(req.body.taskName);
  bucketList = addTask(req.params.id, listItem);

  res.send(bucketList.listItems);
});

router.delete('/', auth, (req, res) => {
  const { error } = validateBucketList(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const bucketList = removeTask(req.params.id, req.body.prev_id , req.body.taskName);
  res.send(bucketList.listItems);
});


async function findOrCreateTask(taskName) {
  let listItem = await ListItem.find({ taskName });
  //console.log(listItem);

  if (!listItem) {
    listItem = new ListItem({ taskName: req.body.taskName });
    listItem.save();
  }
  return listItem;
}

async function addTask(listId, item) {
  const bucketList = await BucketList.findById(listId);
  bucketList.listItems.push(item);
  bucketList.save();
  return bucketList;
}

async function removeTask(listId, prevId, taskName) {
  const bucketList = await BucketList.findById(listId);
  const item = await ListItem.findById(prevId);

  const indexToDelete = bucketList.listItems.indexOf(item);
  bucketList.listItems.splice(indexToDelete, 1)
  return bucketList;
}

module.exports = router;
