import React from 'react';

const Comment = (props) => {

  const { author, text, dateCreated } = props;

  return (
    <div className="comment-container">
      <div className="Comment Post">
        <img className="post-profile-img" />
        <h1 className="post-author">{author}</h1>
        <p className="comment-content">
          {text}
        </p>
      </div>
    </div>
  );
}

export default Comment;
