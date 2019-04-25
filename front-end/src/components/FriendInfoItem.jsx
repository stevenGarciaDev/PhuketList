import React from 'react';
import { addUser, getFriendstatus,acceptFriend } from "../services/friendshipService";
import { getCurrentUser } from '../services/authService';
const FriendInfoItem = (props) => {
  const {email, name, photo,status } = props.user;
  const id = props.user._id;
  //let text = getFriendInfo();
  function getFriendInfo(){
    //e.preventDefault();
    const user = getCurrentUser();
    const emailuse = user.email;
    const friend = getFriendstatus(emailuse,email);
    friend.then(value =>{console.log(value)});
    //console.log(status);
    return 'add';
  }
 
  //var test = 
  async function test (e){
    e.preventDefault();
    console.log(status);
    const user = getCurrentUser();
    const emailuse = user.email;
    if(status ==='Accept'){
      console.log(acceptFriend(email,id,emailuse));
    }
    else if(status ==='Add Friend'){
    
    console.log(addUser(email,id,emailuse));
    }
    //console.log(id);
  }
  
  return (
    <div className="friend-info-item col-md-6">
      <img
        className="post-module-profile-img"
        src={photo || "https://pbs.twimg.com/profile_images/901947348699545601/hqRMHITj_400x400.jpg"}
        alt="Img" />
      <p className="friend-username">{name}</p>
      <button className="btn btn-light" onClick={test}>{status}</button>
    </div>
  );
};

export default FriendInfoItem;
