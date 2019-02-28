const { BucketList } = require("../models/bucketList");
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

// Create a new List item for the current bucket list
router.post('/:id', auth, async (req, res) => {
  // create list item
  let listItem = await ListItem.find({ taskName: req.body.taskName });

  if (listItem.length === 0) {
    listItem = new ListItem({ taskName: req.body.taskName });
    listItem = await listItem.save();
  }

  console.log(listItem);

  //retrieve user's bucket list
  let bucketList = await BucketList.find({ owner: req.params.id });

  // add item to bucket list
  bucketList[0].listItems.push(listItem);
  const response = await bucketList[0].save();

  // return updated list to user
  res.send(bucketList[0].listItems);
});

// Update a List item in the Bucket List
// so should get
// req.params.id     => bucket list id
// req.body.prev_id  => previous list item id
// req.body.taskName => updated task name
router.put('/', auth, (req, res) => {
  // get the previous list item as to remove it from bucket list
  let bucketList = removeTask(req.params.id, req.body.prev_id , req.body.taskName);

  let listItem = findOrCreate(req.body.taskName);
  bucketList = addTask(req.params.id, listItem);

  res.send(bucketList.listItems);
});

router.delete('/', auth, (req, res) => {
  const bucketList = removeTask(req.params.id, req.body.prev_id , req.body.taskName);
  res.send(bucketList.listItems);
});



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
