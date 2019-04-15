import React, { Component } from 'react';
import Message from './Message';

class MessageGroupList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      unreadMessages: 0
    };
  }

  componentDidMount() {

  }

  render() {
    const { unreadMessages } = this.state;

    return (
      <div>
         <h1>Inbox</h1>
         <h2>You have {unreadMessages} unread messages.</h2>
         <div className="messages-list">
          <div>
            <Message />
            <Message />
            <Message />
          </div>
         </div>
      </div>
    );
  }
}

export default MessageGroupList;
