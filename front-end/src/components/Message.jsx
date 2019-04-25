import React, { Component } from 'react';

class Message extends Component {

  render() {
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
          If you can, make a more advanced solution that would “preload” images that are one page below/after the current positi
        </div>

        <hr className="message-divider" />
      </div>
    );
  }
}

export default Message;
