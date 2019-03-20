const { Post, validate } = require('../models/post');
const { upload, resize } = require('../middleware/imageUpload');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

// API endpoint to retrieve post corresponding to a topicID
router.get('/:topicId', async (req, res) => {
  let posts = ["No posts yet."];
  try {
    posts = await Post
      .find({ topicID: req.params.topicId })
      .populate('author', 'name')
      .sort({ dateCreated: 1});
    console.log(posts);
  } catch(ex) {
    console.log("No post were found");
  }
  res.send(posts);
});

// create a new Post,
router.post('/', auth, upload, resize, async (req, res) => {
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
