const mongoose = require("mongoose");
const auth = require('../middleware/auth');
const { Friendship } = require('../models/friendship');
const { Friends } = require("../models/Friend");
const { User } = require("../models/user");
const express = require('express');
const router = express.Router();

router.get('/potentialFriends', async (req, res) => {
  console.log(req.query[0]);
  const user = await User.findOne({email:req.query[0]});
  let friends = await Friendship.findOne({owner:user._id});
  friends = friends.friends;
  //console.log(friends);
  var i;
  var j;
  var k;
  const users = await User.find();
  var test = [];
  var arr = [];
  for(i=0;i<users.length;i++){
    k=0;
    for(j=0;j<friends.length;j++){
      if(friends[j].userEmail === users[i].email){
        k=1;
        console.log("pop");
      }
    }
    if(k==0){
      console.log();
      //console.log(users[i]);
      var obj ={'email':users[i].email,'name':users[i].name,'photo':users[i].photo,'status':'Add Friend'};
    console.log(obj);
      arr.push(obj);
    }
  }
 // console.log(test);
  // retrieve all users who are currently not friends
  
  //console.log("Users retrieved are ... ", users);
  res.send(arr);
});

router.post('/createRequest', (req, res) => {

});

router.get('/getFriends',async(req,res)=>{
  //console.log(req.query[0]);
const user = await User.findOne({email:req.query[0]});
let friends = await Friendship.findOne({owner: user._id});
friends = friends.friends;
res.send(friends);
})
router.get('/getFriendstatus',async(req,res)=>{
  //console.log(req.query[0]);
  console.log(req.query.email);
const user = await User.findOne({email:req.query.email});
let friends = await Friendship.findOne({owner: user._id});
friends = friends.friends;
var i;
for(i=0;i<friends.length;i++){
  if(friends[i].userFreinds === req.query.fremail)
    res.send(friends[i].status);
}
//console.log(friends);
res.send('Add Friend');
})

router.put('/addfriend',async(req,res) =>{
  var exit = true;
  try{
    if(req.body.email === req.body.emailuse){
      exit = false;

    }
    if(exit){
      const user =await User.findOne({ email: req.body.email });
      const curUser =await User.findOne({email: req.body.emailuse});
      // console.log(user);
      let frienduser =await Friendship.find({owner: user._id});
      if(frienduser.length ==0){const userFreinds = new Friendship();
        userFreinds.owner = user._id;
        try{
        await userFreinds.save();
        }
        catch(ex){
        console.log("err");} 
        frienduser =await Friendship.find({owner: user._id});
        //console.log(frienduser);
      }
      //console.log("test");
      let friendcurUser =await Friendship.find({owner: curUser._id});
      let friends =await Friendship.findOne({"owner": curUser._id});
      var i;
      for (i=0;i<friends.friends.length;i++){
        if(friends.friends[i].userEmail === user.email)
          exit = false;
      }
      if(exit){
        fr = new Friends({userid: user._id, userEmail:user.email, userPhoto:user.photo, status: 'pending'});
        //console.log(curUser.email);
        fr1 = new Friends({userid: curUser._id,userEmail:curUser.email,userPhoto:curUser.photo,status: 'sent'});
        //console.log(fr);
        //console.log(fr1);
        friendcurUser[0].friends.push(fr);
        frienduser[0].friends.push(fr1);
        //console.log(friendcurUser);
        //console.log(frienduser[0].friends);
        //console.log("test");
        await friendcurUser[0].save();
        await frienduser[0].save();
        //console.log('test');
        res.send("r1");
      }
      else{
        res.send("user request already sent");
      }
    }
    else{
      res.send("cannot add self");
    }
  }catch(ex){
    console.log(ex);
  }
  
})

module.exports = router;
