import React, { Component } from 'react';
import Post from './post';

class ActivityFeed extends Component {

  render() {
    return (
      <div className="ActivityFeed">
        <div className="activity-content">
          <Post />
        </div>
      </div>
    );
  }

}

export default ActivityFeed;
