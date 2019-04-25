const { Post, validate } = require('../models/post');
const { BucketList } = require('../models/bucketList');
const { ListItem } = require('../models/listItem');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

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
        .limit(25);

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

// API endpoint to retrieve activity feed posts 
router.get('/activityFeed/:limit/:skip', auth, async (req, res) => {
  try {
    // so get User's bucket list, and their list items,
    const bucketList = await BucketList.find({ owner: req.user._id });
    const listItems = bucketList[0].listItems;

    // Get IDs only from users list
    let userItemsIDs = [];
    for (let i = 0; i < listItems.length; i++) {
        let topicID = listItems[i]._id;
        userItemsIDs = userItemsIDs.concat(topicID);
    }

    // Get all posts from list simultaneously
    // For future reference, when friends are implemented
    // {$or: [{ topicID: { $in: userItemsIDs }},
    // { authorID: { $in: __ARRAY OF FRIEND IDS__ ] }}]}
    let recentPosts = await Post.find({$or: [{ topicID: { $in: userItemsIDs }}]})
      .sort({ dateCreated:-1 })
      .populate('author', 'name')
      .limit(parseInt(req.params.limit))
      .skip(parseInt(req.params.skip));
    res.send(recentPosts);
  } catch (ex) {
    console.log('unable to query', ex);
  }
});

// API endpoint to retrieve post corresponding to a topicID
router.get('/:topicId', auth, async (req, res) => {
  let posts = [];
  try {
    //console.log("The topic id is", req.params.topicID);
    posts = await Post
      .find({ topicID: req.params.topicId })
      .populate('author', 'name')
      .sort({ dateCreated: -1 });
    //console.log(posts);
  } catch(ex) {
    console.log("No post were found");
  }
  res.send(posts);
});

// create a new Post,
router.post('/', auth, async (req, res, next) => {
  let post = "";
  try {
    post = new Post({
      text: req.body.text,
      image: req.body.image,
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


   try {


     const Posts = await Post.findById(req.params.topicId);
     Posts.isAppropriate = false;
     Posts.save();

    } catch (e) {
        //print(e);
    }

});


router.get('/getIsAppropriate/:topicId', async (req, res) => {
  try {



    const Posts = await Post.findById(req.params.topicId);

    res.send(Posts.isAppropriate);

   } catch (e) {
       //print(e);
   }


});

module.exports = router;
