import React, { Component } from 'react';
import Message from './Message';
import MessageForm from './MessageForm';

class MessageFeed extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let objDiv = document.querySelector(".MessageFeed");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    const { feed } = this.props;
    console.log("feed is ", feed)
    console.log("PROPS", this.props.feed);

    return (
      <div className="message-feed-container">
        <div className="MessageFeed">
          { feed.messages &&
            feed.messages.map(message => (
              <Message

                />
            ))}
        </div>
        <MessageForm />
      </div>
    );
  }
}

export default MessageFeed;
