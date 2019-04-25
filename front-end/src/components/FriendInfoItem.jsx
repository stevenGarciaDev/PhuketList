import React from 'react';

const FriendInfoItem = (props) => {
  const { name, photo } = props.user;

  return (
    <div className="friend-info-item col-md-6">
      <img
        className="post-module-profile-img"
        src={photo || "https://pbs.twimg.com/profile_images/901947348699545601/hqRMHITj_400x400.jpg"}
        alt="Img" />
      <p className="friend-username">{name}</p>
      <button className="btn btn-light">Make Friend Request</button>
    </div>
  );
};

export default FriendInfoItem;
