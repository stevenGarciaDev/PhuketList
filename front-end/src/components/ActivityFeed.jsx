import React, { Component } from 'react';
import { getPosts } from '../services/postService';
import Post from './post';

class ActivityFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  async componentDidMount() {
    const taskId = this.props;
    const jwt = localStorage.getItem("token");

    let posts = await getPosts(taskId, jwt);
    posts = posts.data;

    console.log("Activity Feed post are", posts);
    console.log("Activity Feed post are", posts.length);
    console.log("post data type is ", typeof posts);
    this.setState({ posts });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="ActivityFeed">
        <div className="activity-content">

          {posts && this.state.posts.map((post) => (
            <Post
              key={post._id}
              author={post.author}
              image={post.image}
              dateCreated={post.dateCreated}
              text={post.content}
              likes={post.likes}
              comments={post.comments}
            />
          ))}

        </div>
      </div>
    );
  }

}

export default ActivityFeed;
