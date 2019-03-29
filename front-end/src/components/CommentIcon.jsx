import React, { Component } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import _ from 'lodash';

class CommentIcon extends Component {

  //console.log("In CommentIcon props are", props);

  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments
    };
  }

  componentDidMount() {
    let { comments } = this.state;
    comments = _.orderBy(comments, ['dateCreated'], ['desc']);
    this.setState({ comments });
  }

  render() {
    const { amount, postId, displayComments } = this.props;
    const { comments } = this.state;

    return (
      <React.Fragment>
        <div className="comment-icon-container">
          <i onClick={this.props.handleDropdown} className="fa fa-comment-o fa-2x" aria-hidden="true"></i>
          <span>{comments.length}</span>
        </div>
        { displayComments &&
          <div>
            <CommentForm postId={postId} onNewComment={this.props.onNewComment}/>
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
}

export default CommentIcon;
