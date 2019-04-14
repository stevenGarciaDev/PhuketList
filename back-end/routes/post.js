const { Post, validate } = require('../models/post');
const { BucketList } = require('../models/bucketList');
const { ListItem } = require('../models/listItem');
const { resize } = require('../middleware/imageUpload');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const jimp = require('jimp');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const isPhoto = file.mimetype.startsWith('image');
    if (isPhoto) {
      console.log("the request body is ", req.body);
      console.log("is photo");
      cb(null, true);
    } else {
      console.log("that filetype isn't allowed");
      cb({ message: "That filetype isn't allowed!" }, false);
    }
  }
};


// API endpoint to retrieve all post related to User
router.get('/activityPage', auth, async (req, res) => {
  try {
    // so get User's bucket list, and their list items,
    const bucketList = await BucketList.find({ owner: req.user._id });
    const listItems = bucketList[0].listItems;

    let recentPostsFeed = [];
    //get post from those list items
    for (let i = 0; i < listItems.length; i++) {
      // get all most recent 5 post from the list item
      let topicID = listItems[i]._id;
      let recentPost = await Post.find({ topicID })
        .sort({ dateCreated: -1 })
        .populate('author', 'name')
        .populate('likes', '_id')
        .limit(5);

      //console.log("Likes are...", recentPost[0].recentPos);
      recentPostsFeed = [...recentPostsFeed, ...recentPost];
      //console.log('recent post are', recentPostsFeed);
    }

    //console.log("id for FIRST LIKE", recentPostsFeed[2].likes[0]);

    res.send(recentPostsFeed);
  } catch (ex) {
    console.log('unable to query', ex);
  }

});

// API endpoint to retrieve post corresponding to a topicID
router.get('/:topicId', auth, async (req, res) => {
  let posts = [];
  try {
    console.log("The topic id is", req.params.topicID);
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
router.post('/', multer(multerOptions).single('image'), resize, auth, async (req, res, next) => {
  try {
    console.log("body is");
    console.log("the file is ", req.file);
  } catch (ex) {
    console.log("that file cause an error");
  }

  let post = "";
  try {
    post = new Post({
      text: req.body.text,
      topicID: req.body.topicID,
      author: req.user._id,
      dateCreated: Date.now()
    });
    console.log("new post is", post);
    await post.save();
    console.log("new post saved");
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
  const { likesArr } = req.body;

  try {
    console.log("the POST ID TO LIKE Is", req.params.id);
    console.log("BODY", req.body);
    const post = await Post.findById(req.params.id);

    if (likesArr[0] == null) {
      post.likes = [];
    } else {
      post.likes = likesArr;
    }

    post.save();
    console.log(post.likes);
  } catch (ex) {
    console.log("unable to update Post's likes", ex);
  }
});

router.delete('/:id', auth, async (req, res) => {

});

router.put('/reportPost/:topicId', async (req, res) => {
  
});

module.exports = router;
