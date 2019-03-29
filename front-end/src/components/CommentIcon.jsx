import React from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';

const CommentIcon = (props) =>  {

  const { amount, postId, displayComments, comments } = props;

  //console.log("In CommentIcon props are", props);

  return (
    <React.Fragment>
      <div className="comment-icon-container">
        <i onClick={props.handleDropdown} className="fa fa-comment-o fa-2x" aria-hidden="true"></i>
        <span>{comments.length}</span>
      </div>
      { displayComments &&
        <div>
          <CommentForm postId={postId} onNewComment={props.onNewComment}/>
          {comments.length > 0 && comments.map(comment => (
            <Comment
              postId={postId}
              text={comment.text}
              dateCreated={comment.dateCreated}
            />
          ))}
        </div>
      }
    </React.Fragment>
  );
}

export default CommentIcon;
