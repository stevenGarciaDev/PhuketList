const { Post } = require('../models/post');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post();

});

router.post('/', async (req, res) => {

});

router.post('/:id', async (req, res) => {

});

router.put('/:id', async (req, res) => {

});

router.delete('/:id', async (req, res) => {

});

module.exports = router;
