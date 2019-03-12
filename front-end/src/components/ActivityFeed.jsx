import React, { Component } from 'react';
import Post from './post';

class ActivityFeed extends Component {

  render() {
    return (
      <div className="ActivityFeed">
        <aside className="activity-profile-content">

        </aside>
        <div className="activity-content">
          <Post />
        </div>
      </div>
    );
  }

}

export default ActivityFeed;
