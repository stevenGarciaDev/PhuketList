import React, { Component } from 'react';
import ActivityFeed from './ActivityFeed';
import Post from './post';
import { getAllPost } from '../services/postService';

class UserActivityPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  async componentDidMount() {
    // get all post from user's associated group
    // sort chronological
    const jwt = localStorage.getItem("token");

    try {
      const posts = await getAllPost(jwt);
      this.setState({ posts });
      console.log("POST!!", posts);
    } catch (ex) {

    }
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="ActivityFeed">
        <div className="activity-content">

          {posts && this.state.posts.map(post => (
            <Post
              key={post._id}
              id={post._id}
              author={post.author}
              image={post.image}
              dateCreated={post.dateCreated}
              text={post.text}
              likes={post.likes}
              comments={post.comments}
            />
          ))}

        </div>
      </div>
    );
  }
}

export default UserActivityPage;
