import React, { Component } from 'react';
import { getPosts } from '../services/postService';
import PostForm from './postForm';
import Post from './post';

class ActivityFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      taskId: ""
    };
  }

  async componentDidMount() {
    const taskId = this.props;
    const jwt = localStorage.getItem("token");

    let posts = await getPosts(taskId, jwt);
    posts = posts.data;
    this.setState({ posts });
  }

  render() {
    const { posts, taskId } = this.state;

    return (
      <div className="ActivityFeed">
        <div className="activity-content">

          { taskId !== null && <PostForm taskId={taskId} /> }

          {posts && this.state.posts.map((post) => (
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

export default ActivityFeed;
