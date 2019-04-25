import React, { Component } from 'react';
import MessageGroupList from './MessageGroupList';
import MessageFeed from './MessageFeed';

class MessagePage extends Component {

  render() {
    return (
      <div id="MessagePage" className="container-fluid">
        <div className="row">
          <div className="col-lg-4">
            <MessageGroupList />
          </div>
          <div className="col-lg-8">
            <MessageFeed />
          </div>
        </div>
      </div>
    );
  }
}

export default MessagePage;
