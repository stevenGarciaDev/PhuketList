const { Post, validate } = require('../models/post');
const { upload, resize } = require('../middleware/imageUpload');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  // retrieve all post
  // relevant to the context
  // that being either
  // a user's activity feed,
  // a user's profile page,
  // or a group's activity feed

  // so would consist of collections
  // Post -> id
  //
});

// create a new Post,
// :id is for list item
router.post('/', auth, upload, resize, async (req, res) => {
  console.log('backend');
  console.log('text', req.body.text);
  const { error } = validate(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  let post = new Post({
    content: req.body.text,
    image: req.body.image,
    topicID: req.body.topicID,
    author: req.user._id
  });
  await post.save();

});

router.post('/:id', async (req, res) => {
    console.log("getting backend request");
});

router.put('/:id', auth, async (req, res) => {

});

router.delete('/:id', auth, async (req, res) => {

});

module.exports = router;
