import React, { Component } from 'react';
import Post from './post';
import PostForm from './postForm';

class ActivityFeed extends Component {

  render() {
    return (
      <div className="ActivityFeed">
        <aside className="activity-profile-content">

        <PostForm />

        </aside>
        <div className="activity-content">
          <Post />
        </div>
      </div>
    );
  }

}

export default ActivityFeed;
