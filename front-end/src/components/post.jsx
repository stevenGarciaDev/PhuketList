import React, { Component } from 'react';
import Like from './Like';
import CommentIcon from './CommentIcon';
import photo from '../assets/images/jackie-tsang-458443-unsplash.jpg';


class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      img: "",
      textContent: "",
      likes: 14,
      didLike: false,
      comments: 4,
      displayComments: false
    };
  }

  handleLike = () => {
    const { didLike, likes } = this.state;
    const currentLikeStatus = !didLike; // toggle

    const amount = currentLikeStatus ? likes + 1 : likes - 1;

    this.setState({
      didLike: currentLikeStatus,
      likes: amount
    });
  }

  handleCommentsDropdown = () => {
    this.setState({
      displayComments: !this.state.displayComments
    });
  }

  render() {
    const {
      didLike,
      likes,
      comments,
      displayComments
    } = this.state;

    return (
      <div className="Post">
        <img className="post-profile-img" />
        <h1 className="post-author">John Smith</h1>
        <h2 className="post-date">30 min</h2>
        <p className="post-content">
          Donec id elit non mi porta gravida at eget metus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <img className="post-img" src={photo} alt="Post" />

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
