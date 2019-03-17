const { Post } = require('../models/post');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const posts = await Post();
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

router.post('/', auth, async (req, res) => {

});

router.post('/:id', auth, async (req, res) => {

});

router.put('/:id', auth, async (req, res) => {

});

router.delete('/:id', auth, async (req, res) => {

});

module.exports = router;
