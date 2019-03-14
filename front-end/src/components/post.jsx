import React from 'react';
import photo from '../assets/images/jackie-tsang-458443-unsplash.jpg';

const Post = props => {
  return (
    <div className="Post">
      <img className="post-profile-img" />
      <h1 className="post-author">John Smith</h1>
      <h2 className="post-date">30 min</h2>
      <p className="post-content">
        Donec id elit non mi porta gravida at eget metus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <img className="post-img" src={photo} alt="Post" />
    </div>
  );
};

export default Post;
