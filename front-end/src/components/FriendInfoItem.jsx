import React, { Component } from 'react';

class FriendInfoItem extends Component {
  // const {email, name, photo,status } = props.user;
  // const id = props.user._id;

  // handleEdit = async (e) => {
  //   e.preventDefault();
  //   console.log("edit status");
  //   const { name, email, id, status } = this.props.user;
  //   const user = getCurrentUser();
  //   const emailuse = user.email;
  //   if (status === 'Accept'){
  //     acceptFriend(email,id,emailuse);
  //   }
  //   else if (status === 'Add Friend') {
  //     addUser(email,id,emailuse);
  //     //sendFriendRequest(email, id, emailuse);
  //     this.props.onEditFriendStatus(`Sent Friend Request to ${name}`);
  //   }
  //   else if (status==="Remove" || status === "Pending" )
  //   {
  //     removeFriend(email,id,emailuse);
  //   }
  // }

  render() {
    const { user } = this.props;

    return (
      <div className="friend-info-item col-md-6">
        <img
          className="post-module-profile-img"
          src={user.photo || "https://pbs.twimg.com/profile_images/901947348699545601/hqRMHITj_400x400.jpg"}
          alt="Img" />
        <p className="friend-username">{user.name}</p>
        <button className="btn btn-light" onClick={(e) => this.props.onEditFriendStatus(e, user)}>{user.status}</button>
      </div>
    );
  }
};

export default FriendInfoItem;
