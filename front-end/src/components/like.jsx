import React, { Component } from 'react';

const Like = (props) => {
  const { hasLiked, totalLikes } = props;

  return (
    <div className="like-container">
      { hasLiked ?
        <i onClick={props.onClick} className="fa fa-thumbs-up thumbs-up-icon fa-2x" aria-hidden="true"></i>
      :
        <i onClick={props.onClick} className="fa fa-thumbs-o-up fa-2x" aria-hidden="true"></i>
      }
      <span>{totalLikes}</span>
    </div>
  );
};

export default Like;
