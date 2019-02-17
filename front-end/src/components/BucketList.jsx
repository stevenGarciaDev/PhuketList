import React, { Component } from 'react';
import ListItem from './ListItem';

// max length for taskName is 60 char
class BucketList extends Component {

  render() {
    return (
      <div>
        <ul>
          <ListItem taskName="Skydiving" />
          <ListItem taskName="Travel Europe" />
          <ListItem taskName="cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc" />
        </ul>
      </div>
    );
  }
}

export default BucketList;
