import React, { Component } from 'react';

class Message extends Component {

  render() {
    //const { name, photo, message, dateCreated } = this.props.feed;
    console.log("PROPS", this.props);

    return (
      <div className="message">
        <div className="text-left row msg-header-container">
          <img
            className="post-module-profile-img"
            src={"" || "https://pbs.twimg.com/profile_images/901947348699545601/hqRMHITj_400x400.jpg"}
            alt="Img" />
          <h2 className="msg-author">John Snow</h2>
          <p className="msg-created-at">11:00 PM</p>
        </div>

        <div className="msg-text-container">
          Text
        </div>

        <hr className="message-divider" />
      </div>
    );
  }
}

export default Message;
