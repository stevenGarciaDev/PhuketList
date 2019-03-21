import React from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';

const CommentIcon = (props) =>  {

  const { amount, displayComments, taskId } = props;

  return (
    <React.Fragment>
      <div className="comment-icon-container">
        <i onClick={props.handleDropdown} className="fa fa-comment-o fa-2x" aria-hidden="true"></i>
        <span>{amount}</span>
      </div>
      { displayComments &&
        <div>
          <CommentForm taskId={taskId} />
          <Comment />
        </div>
      }
    </React.Fragment>
  );
}

export default CommentIcon;
