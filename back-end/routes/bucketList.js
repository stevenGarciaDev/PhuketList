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

  //retrieve user's bucket list
  let bucketList = await BucketList.find({ owner: req.params.id });

  // add item to bucket list
  bucketList[0].listItems.push(listItem);
  const response = await bucketList[0].save();

  // return updated list to user
  res.send(bucketList[0].listItems);
});

// Update a List item in the Bucket List
router.post('/update/:id', auth, async (req, res) => {
  // retrieve user's bucket list
  let bucketList = await BucketList.find({ owner: req.params.id });
  bucketList = bucketList[0];

  // get the list item
  let listItem = await ListItem.findById( req.body.item._id );
  listItem.taskName = req.body.newText;
  await listItem.save();

  // change the name of the item
  for (let i = 0; i < bucketList.listItems.length; i++) {
    const currentItem = bucketList.listItems[i];
    const currentId = String( currentItem._id );

    if (currentId === req.body.item._id) {
      bucketList.listItems[i].taskName = req.body.newText;
      break;
    }
  }

  // save return back to user
  await bucketList.save();

  res.send(bucketList.listItems);
});


router.put('/:id', auth, async (req, res) => {
  // retrieve user's bucket list
  let bucketList = await BucketList.find({ owner: req.params.id });
  bucketList = bucketList[0];

  // find index of item to modify
  let index = -1;
  for (let i = 0; i < bucketList.listItems.length; i++) {
    const currentItem = bucketList.listItems[i];
    const currentId = String( currentItem._id );

    if (currentId === req.body.item._id) {
      index = i;
      break;
    }
  }

  // toggle the isCompleted
  bucketList.listItems[index].isCompleted = !bucketList.listItems[index].isCompleted;

  // save return back to user
  await bucketList.save();

  res.send(bucketList.listItems);
});

// remove a list item from user's bucket list
router.post('/remove/:id', auth, async (req, res) => {
  // retrieve the user's bucket list
  let bucketList = await BucketList.find({ owner: req.params.id });
  bucketList = bucketList[0];

  // remove the list item from the bucket list
  bucketList.listItems = bucketList.listItems.filter(item => item._id != req.body.item._id );
  await bucketList.save();

  // remove the list item
  await ListItem.deleteOne({ _id: req.body.item._id });

  res.send(bucketList.listItems);
});


module.exports = router;
