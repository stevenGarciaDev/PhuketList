import React, { Component } from 'react';
import MessageGroupList from './MessageGroupList';
import MessageFeed from './MessageFeed';
import { getCurrentUser } from '../services/authService';
import { retrieveMessageGroups, getMessageFeedData } from '../services/messageService';

class MessagePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messageGroups: [],
      currentGroupFeed: [],
    };
  }

  componentDidMount = async () => {
    // get message groups for this user
    const user = await getCurrentUser();
    const res = await retrieveMessageGroups(user);
    // console.log("** response ** ", res);
    let currentGroupFeed = [];

    if (res.data.length > 0) {
      currentGroupFeed = res.data[0];
      //console.log("!!currentGroupFeed", currentGroupFeed);

      this.populateMessageFeed(currentGroupFeed);
      //console.log("%% data is ", data);
    } else {
      console.log("no message group", res.data);
    }

    this.setState({ messageGroups: res.data });
  }

  updateGroupList = (newGroup) => {
    const messageGroups = [ ...this.state.messageGroups ];
    //console.log("new group is ", newGroup.data);
    messageGroups.push(newGroup.data);
    this.setState({ messageGroups });
  }

  populateMessageFeed = async (currentGroup) => {
    //console.log("%%the message feed is ", currentGroup);
    const response = await getMessageFeedData(currentGroup);
    console.log("**the response is ", response.data);

    this.setState({ currentGroupFeed: response.data });
  }

  render() {
    const { messageGroups, currentGroupFeed } = this.state;
    //console.log("currentGroupFeed are ", currentGroupFeed)

    return (
      <div id="MessagePage" className="container-fluid">
        <div className="row">
          <div className="col-lg-4">
            <MessageGroupList messageGroups={messageGroups} updateGroupList={this.updateGroupList} />
          </div>
          <div className="col-lg-8">
            { currentGroupFeed &&
              <MessageFeed feed={currentGroupFeed} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default MessagePage;
