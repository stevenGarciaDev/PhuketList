import React, { Component } from 'react';
import { getMostRecentMessage } from '../services/messageService';

class MessageListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recentMessage: "",
    };
  }

  componentDidMount = async () => {
    //console.log("The PROPS ARE", this.props.group);
    const res = await getMostRecentMessage(this.props.group._id);
    // console.log("recent message", res);
  }

  displayPreviewText = text => {
    let output = text.slice(0, 25);
    return output + '...';
  }

  render() {
    const { members, messages } = this.props.group;

    //console.log("**Groups in items is ", group);

    return (
      <div className="message-group-list-item">
        <h2>Group Message</h2>

        { messages.length === 0 ?
            <p>No messages in this group.</p>
          :
            <React.Fragment>
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
            </React.Fragment>
        }


      </div>
    );
  }

}

export default MessageListItem;
