import React, { Component } from 'react';
import ActivityFeed from './ActivityFeed';

class ActivityPage extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <ActivityFeed />
      </div>
    )
  }
}

export default ActivityPage;
