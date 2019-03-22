import React from 'react';

const Comment = (props) => {

  const { text, dateCreated } = props;
  console.log("comment text", text);
  console.log("comment date created", dateCreated);

  return (
    <div className="comment-container">
      <div className="Comment Post">
        <img className="post-profile-img" />
        <h1 className="post-author">John Smith</h1>
        <p className="comment-content">
          {text}
        </p>
      </div>
    </div>
  );
}

export default Comment;
