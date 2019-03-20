import React, { Component } from 'react';
import Moment from 'react-moment';
import Like from './Like';
import CommentIcon from './CommentIcon';
// import photo from '../assets/images/jackie-tsang-458443-unsplash.jpg';

class Post extends Component {

  constructor(props) {
    super(props);
    const { author, image, dateCreated, text, likes, comments } = this.props;
    this.state = {
      author: author,
      image: image,
      dateCreated: dateCreated,
      text: text,
      likes: likes,
      didLike: false,
      comments: comments,
      displayComments: false
    };
  }

  handleLike = () => {
    const { author, didLike } = this.state;
    let likes = [...this.state.likes];
    const currentLikeStatus = !didLike; // toggle

    const amount = currentLikeStatus ?
      likes.push(author._id)
     :
      likes.splice( likes.indexOf(author._id), 1 );

    this.setState({
      didLike: currentLikeStatus,
      likes: likes
    });
  }

  handleCommentsDropdown = () => {
    this.setState({
      displayComments: !this.state.displayComments
    });
  }

  render() {
    const {
      author,
      dateCreated,
      text,
      didLike,
      likes,
      comments,
      displayComments
    } = this.state;

    return (
      <div className="Post">
        <img className="post-profile-img" />
        <h1 className="post-author">{author.name}</h1>
        <h2 className="post-date">
          <Moment fromNow>{dateCreated}</Moment>
        </h2>
        <p className="post-content">{text}</p>

        <div>
          <Like
            hasLiked={didLike}
            totalLikes={likes}
            onClick={this.handleLike} />
          <CommentIcon
            amount={comments}
            displayComments={displayComments}
            handleDropdown={this.handleCommentsDropdown} />
        </div>
      </div>
    );
  }
};

export default Post;
