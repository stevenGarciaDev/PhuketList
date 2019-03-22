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

    this.state = {
      id: id,
      author: author,
      image: image,
      dateCreated: dateCreated,
      text: text,
      likes: likes,
      didLike: true,
      comments: comments,
      displayComments: false
    };
  }

  async componentDidMount () {
    const currentUser = await getCurrentUser();
    const { likes } = this.state;
    
    let didPrevLike = false;
    didPrevLike = likes.indexOf(currentUser._id) !== -1 ? true : false;
    this.setState({ didLike: didPrevLike });
  }

  handleLike = async () => {
    const { author, didLike, id } = this.state;
    let likes = [...this.state.likes];
    const currentLikeStatus = !didLike; // toggle

    if (currentLikeStatus) {
      likes.push(author._id);
    } else {
      likes.splice( likes.indexOf(author._id), 1 );
    }

    this.setState({ didLike: currentLikeStatus, likes });

    try {
      const jwt = localStorage.getItem("token");
      await updateLikeInfo(likes, id, jwt);
    } catch (ex) {
      console.log('did not update');
    }
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
            postId={id} />
        </div>
      </div>
    );
  }
};

export default Post;
