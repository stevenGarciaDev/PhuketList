import React, { Component } from 'react';
import Moment from 'react-moment';
import Like from './Like';
import CommentIcon from './CommentIcon';
import { updateLikeInfo } from '../services/postService';
import { getCurrentUser } from '../services/authService';
// import photo from '../assets/images/jackie-tsang-458443-unsplash.jpg';

class Post extends Component {

  constructor(props) {
    super(props);
    const { id, author, image, dateCreated, text, likes, comments } = this.props;

    // console.log("THE PROPs for post is", this.props);
    // need to get the current user based on jwt
    const user = getCurrentUser();
    let didPrevLike = likes.indexOf(user._id) !== -1 ? true : false;

    console.log("POST: The Likes array is", likes);
    console.log("POST: the user id is", user._id);

    this.state = {
      id: id,
      author: author,
      image: image,
      dateCreated: dateCreated,
      text: text,
      likes: likes,
      didLike: didPrevLike,
      comments: comments,
      displayComments: false
    };
  }

  async componentDidMount () {

  }

  handleLike = async () => {
    const user = getCurrentUser();
    const { didLike, id } = this.state;
    let likes = [...this.state.likes];
    const currentLikeStatus = !didLike; // toggle

    if (currentLikeStatus) {
      likes.push(user._id);
    } else {
      likes.splice( likes.indexOf(user._id), 1 );
    }

    this.setState({ didLike: currentLikeStatus, likes });

    try {
      const jwt = localStorage.getItem("token");
      await updateLikeInfo(likes, id, jwt);
    } catch (ex) {
      console.log('did not update');

    }
  }

  handleNewComment = async (comment) => {
    comment.then(result => {
      const comments = [...this.state.comments];
      comments.unshift(result.data);
      this.setState({ comments });
    }).catch(err => {
      console.log("Error", err);
    });
  }

  handleCommentsDropdown = () => {
    this.setState({
      displayComments: !this.state.displayComments
    });
  }

  render() {
    const {
      id,
      author,
      image,
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
            <Moment format="MM/DD/YYYY">
              {dateCreated}
           </Moment>
        </h2>
        <p className="post-content">{text}</p>

        { image !== '' && <img src={image} /> }

        <div>
          <Like
            hasLiked={didLike}
            totalLikes={likes}
            onClick={this.handleLike} />
          <CommentIcon
            displayComments={displayComments}
            comments={comments}
            handleDropdown={this.handleCommentsDropdown}
            onNewComment={this.handleNewComment}
            postId={id} />
        </div>
      </div>
    );
  }
};

export default Post;
