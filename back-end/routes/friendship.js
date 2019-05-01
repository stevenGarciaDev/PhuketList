const mongoose = require("mongoose");
const auth = require('../middleware/auth');
const { Friendship } = require('../models/friendship');
const { Friends } = require("../models/Friend");
const { User } = require("../models/user");
const express = require('express');
const router = express.Router();

router.get('/potentialFriends', async (req, res) => {
  const user = await User.findOne({email:req.query[0]});
  let friends = await Friendship.findOne({owner:user._id});
  friends = friends.friends;
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
      var obj ={'email':users[i].email,'name':users[i].name,'photo':users[i].photo,'status':'Add Friend'};
      arr.push(obj);
    }
  }
  res.send(arr);
});

router.post('/createRequest', (req, res) => {

});

router.get('/getFriends',async(req,res)=>{
  const user = await User.findOne({email:req.query[0]});
  let friends = await Friendship.findOne({owner: user._id});
  friends = friends.friends;
  res.send(friends);
})

router.get('/getFriendstatus',async(req,res)=>{
  const user = await User.findOne({email:req.query.email});
  let friends = await Friendship.findOne({owner: user._id});
  friends = friends.friends;
  var i;
  for(i=0;i<friends.length;i++){
    if(friends[i].userFreinds === req.query.fremail)
      res.send(friends[i].status);
}

res.send('Add Friend');
})

router.put('/acceptFriend',async(req,res) =>{
  const user =await User.findOne({ email: req.body.email });
  const curUser =await User.findOne({email: req.body.emailuse});
  let friendcurUser =await Friendship.findOne({owner: user._id});
  let frienduser =await Friendship.findOne({owner: curUser._id});


  var i;
  var exit = true;
  for(i=0;i<frienduser.friends.length;i++){
    if(frienduser.friends[i].userEmail === user.email){
      if(frienduser.friends[i].status === 'Accept')
        exit = true;
      else
        exit = false;
    }
  }
  if(exit){
    var frienduserarray=[];
    var friendcurUserArray=[];
    for(i=0;i<frienduser.friends.length;i++){
      let fr =new Friends();
      if(frienduser.friends[i].userEmail === user.email){
        fr.userid = frienduser.friends[i].userid;
        fr.userEmail = frienduser.friends[i].userEmail;
        fr.userPhoto = frienduser.friends[i].userPhoto;
        fr.status = 'Remove';
        frienduserarray.push(fr);
      }
      else{
        fr.userid = frienduser.friends[i].userid;
        fr.userEmail = frienduser.friends[i].userEmail;
        fr.userPhoto = frienduser.friends[i].userPhoto;
        fr.status = frienduser.friends[i].status;
        frienduserarray.push(fr);
      }
    }
    for(i=0;i<friendcurUser.friends.length;i++){
      let fr1 = new Friends();
      if(friendcurUser.friends[i].userEmail === curUser.email){
        fr1.userid = friendcurUser.friends[i].userid;
        fr1.userEmail = friendcurUser.friends[i].userEmail;
        fr1.userPhoto = friendcurUser.friends[i].userPhoto;
        fr1.status = 'Remove';
        friendcurUserArray.push(fr1);
      }
      else{
        fr1.userid = friendcurUser.friends[i].userid;
        fr1.userEmail = friendcurUser.friends[i].userEmail;
        fr1.userPhoto = friendcurUser.friends[i].userPhoto;
        fr1.status = friendcurUser.friends[i].status;
        friendcurUserArray.push(fr1);
      }
    }
    friendcurUser.friends=friendcurUserArray;
    await friendcurUser.save();
    frienduser.friends=frienduserarray;
    await frienduser.save();
    res.send("done");
  }
  else{
    res.send("err");
  }
})


router.put('/removeFriend',async(req,res) =>{
  const user =await User.findOne({ email: req.body.email });
  const curUser =await User.findOne({email: req.body.emailuse});
  let friendcurUser =await Friendship.findOne({owner: user._id});
  let frienduser =await Friendship.findOne({owner: curUser._id});


  var i;
  var exit = true;
  for(i=0;i<frienduser.friends.length;i++){
    if(frienduser.friends[i].userEmail === user.email){
      if(frienduser.friends[i].status === 'Remove' || frienduser.friends[i].status==='pending')
        exit = true;
      else
        exit = false;
    }
  }
  if(exit){
    var frienduserarray=[];
    var friendcurUserArray=[];
    for(i=0;i<frienduser.friends.length;i++){
      let fr =new Friends();
      if(frienduser.friends[i].userEmail === user.email){

      }
      else{
        fr.userid = frienduser.friends[i].userid;
        fr.userEmail = frienduser.friends[i].userEmail;
        fr.userPhoto = frienduser.friends[i].userPhoto;
        fr.status = frienduser.friends[i].status;
        frienduserarray.push(fr);
      }
    }
    for(i=0;i<friendcurUser.friends.length;i++){
      let fr1 = new Friends();
      if(friendcurUser.friends[i].userEmail === curUser.email){

      }
      else{
        fr1.userid = friendcurUser.friends[i].userid;
        fr1.userEmail = friendcurUser.friends[i].userEmail;
        fr1.userPhoto = friendcurUser.friends[i].userPhoto;
        fr1.status = friendcurUser.friends[i].status;
        friendcurUserArray.push(fr1);
      }
    }
    friendcurUser.friends=friendcurUserArray;
    await friendcurUser.save();
    frienduser.friends=frienduserarray;
    await frienduser.save();
    res.send("done");
  }
  else{
    res.send("err");
  }

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
      let frienduser =await Friendship.find({owner: user._id});
      if(frienduser.length ==0){const userFreinds = new Friendship();
        userFreinds.owner = user._id;
        try{
        await userFreinds.save();
        }
        catch(ex){
        console.log("err");}
        frienduser =await Friendship.find({owner: user._id});
      }
      let friendcurUser =await Friendship.find({owner: curUser._id});
      let friends =await Friendship.findOne({"owner": curUser._id});
      var i;
      for (i=0;i<friends.friends.length;i++){
        if(friends.friends[i].userEmail === user.email)
          exit = false;
      }
      if(exit){
        fr = new Friends({userid: user._id, userEmail:user.email, userPhoto:user.photo, status: 'pending'});
        fr1 = new Friends({userid: curUser._id,userEmail:curUser.email,userPhoto:curUser.photo,status: 'Accept'});
        friendcurUser[0].friends.push(fr);
        frienduser[0].friends.push(fr1);
        await friendcurUser[0].save();
        await frienduser[0].save();
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
