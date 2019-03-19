import React from 'react';

const Comment = (props) => {
  return (
    <div className="comment-container">
      <div className="Comment Post">
        <img className="post-profile-img" />
        <h1 className="post-author">John Smith</h1>
        <p className="comment-content">
          Beyonce had one of the greatest videos of all time.
        </p>
      </div>
    </div>
  );
}

export default Comment;
