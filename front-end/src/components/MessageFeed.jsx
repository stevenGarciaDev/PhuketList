import React, { Component } from 'react';
import Message from './Message';
import MessageForm from './MessageForm';

class MessageFeed extends Component {

  componentDidMount() {
    let objDiv = document.querySelector(".MessageFeed");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    return (
      <div className="message-feed-container">
        <div className="MessageFeed">
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
        <MessageForm />
      </div>
    );
  }
}

export default MessageFeed;
