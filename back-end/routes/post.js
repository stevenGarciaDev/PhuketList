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
      .sort({ dateCreated: -1 });
    console.log(posts);
  } catch(ex) {
    console.log("No post were found");
  }
  res.send(posts);
});

// create a new Post,
router.post('/', auth, upload, resize, async (req, res) => {
  let post = "";
  try {
    post = new Post({
      text: req.body.text,
      image: req.body.image,
      topicID: req.body.topicID,
      author: req.user._id
    });
    await post.save();
  } catch (ex) {
    console.log('unable to create post', ex);
  }
  res.send(post);
});

router.post('/:id', async (req, res) => {
    console.log("getting backend request");
});

// for updating the like attribute in Post model
router.post('/:id/likes', auth, async (req, res) => {
  console.log('backend reached for update');

  try {
    const post = await Post.findById(req.params.id);
    post.likes = req.body.likesArr;
    post.save();
    console.log(post.likes);
  } catch (ex) {
    console.log("unable to update Post's likes");
  }
});

router.delete('/:id', auth, async (req, res) => {

});

module.exports = router;
