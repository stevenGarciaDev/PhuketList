import React, { Component } from 'react';
import Like from './like';
import photo from '../assets/images/jackie-tsang-458443-unsplash.jpg';


class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      img: "",
      textContent: "",
      likes: 14,
      didLike: false
    };
  }

  handleLike = () => {
    const { didLike, likes } = this.state;
    const prevLikeState = !didLike; // toggle

    const amount = prevLikeState ? likes + 1 : likes - 1;
    console.log(amount);

    this.setState({
      didLike: !this.state.didLike,
      likes: amount
    });
  }

  render() {
    const { didLike, likes } = this.state;

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
          <Like hasLiked={didLike} totalLikes={likes} onClick={this.handleLike} />
          <div className="comment-container">
            <i className="fa fa-comment-o fa-2x" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    );
  }
};

export default Post;
