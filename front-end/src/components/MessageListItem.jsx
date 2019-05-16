import React, { Component } from 'react';
//import { getMostRecentMessage } from '../services/messageService';

class MessageListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recentMessage: "",
    };
  }

  componentDidMount = async () => {
    //console.log("The PROPS ARE", this.props.group);
    //const res = await getMostRecentMessage(this.props.group._id);
    // console.log("recent message", res);
  }

  displayPreviewText = text => {
    let output = text.slice(0, 25);
    return output + '...';
  }

  render() {
    const { messages } = this.props.group;
    const { group } = this.props;

    console.log("GROUP", group);

    return (
      <div className="message-group-list-item" onClick={(e) => this.props.onItemClick(group)}>
        <h2>Group Message</h2>

        { messages.length === 0 ?
            <p>No recent messages.</p>
          :
            <React.Fragment>
              <div>
                Amount of Members:
                <span>{ group.members.length }</span>
              </div>
            </React.Fragment>
        }


      </div>
    );
  }

}

export default MessageListItem;
