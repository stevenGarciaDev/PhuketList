import React, { Component } from 'react';

class MessageListItem extends Component {

  displayPreviewText = text => {
    let output = text.slice(0, 25);
    return output + '...';
  }

  render() {
    return (
      <div className="message-group-list-item">
        <h2>Tacos Group</h2>

        <div className="float-left">
          <img
           className="post-module-profile-img"
           src={"" || "https://pbs.twimg.com/profile_images/901947348699545601/hqRMHITj_400x400.jpg"}
           alt="Img" />
          <span>John Snow</span>
        </div>

        <div className="list-item-msg">
          {this.displayPreviewText("Eating carne asada tacos...")}
        </div>
      </div>
    );
  }

}

export default MessageListItem;
