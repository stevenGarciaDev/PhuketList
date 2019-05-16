import React, { Component } from 'react';
import MessageGroupList from './MessageGroupList';
import MessageFeed from './MessageFeed';
import MessageGroupForm from './MessageGroupForm';
import { getCurrentUser } from '../services/authService';
import {
  createNewGroup,
  retrieveMessageGroups,
  getCurrentGroupMembers,
  sendMessage } from '../services/messageService';
import { getFriends } from '../services/friendshipService';
import socketIOClient from "socket.io-client";

class MessagePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messageGroups: [],
      currentGroupFeed: [],
      friendsList: [],
      currentGroupMembers: []
    };
  }

  componentDidMount = async () => {
    // get message groups for this user
    const user = await getCurrentUser();
    const friendsList = await getFriends(user.email);
    const res = await retrieveMessageGroups(user);
    let currentGroupFeed = [];

    if (res.data.length > 0) {
      currentGroupFeed = res.data[0];

      this.populateMessageFeed(currentGroupFeed);
    } else {
      console.log("no message group", res.data);
    }

    this.setState({ messageGroups: res.data, friendsList: friendsList.data });
  }

  makeNewGroup = async (membersToAdd) => {
    let messageGroups = [ ...this.state.messageGroups ];
    const user = getCurrentUser();
    membersToAdd.push({ id: user._id });
    const newGroup = await createNewGroup(membersToAdd);
    console.log("new group is ", newGroup);

    messageGroups.push(newGroup);
    console.log("messageGroups are now ", messageGroups);
    this.setState({ messageGroups });
  }

  populateMessageFeed = async (currentGroup) => {
    const socket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT);
    socket.on('update messages', async (groupFeed) => {
      //console.log("currentGroupFeed", currentGroupFeed);
      //console.log("groupFeed", groupFeed);

      let currentGroupFeed = await getCurrentGroupMembers(groupFeed);
      this.setState({ currentGroupFeed });
      return;
    });

    let currentGroupFeed = await getCurrentGroupMembers(currentGroup);
    this.setState({ currentGroupFeed });
  }

  sendMessage = async (e, msg) => {
    e.preventDefault();
    const user = getCurrentUser();
    let { currentGroupFeed } = this.state;

    const response = sendMessage(user._id, msg, currentGroupFeed._id);

    response.then(data => {
      //console.log("data is ", data);
      currentGroupFeed.messages.push(data);
      this.setState({ currentGroupFeed });
    }).catch(ex => {
      console.log("unable to handle data", ex);
    });
  }

  render() {
    const { messageGroups, friendsList } = this.state;
    let currentGroupFeed = { ...this.state.currentGroupFeed };

    //console.log("Current group feed is ", currentGroupFeed);

    //console.log("current group feed is ", currentGroupFeed.messages);

    return (
      <div id="MessagePage" className="container-fluid">
        <div className="row">
          <div className="col-lg-4">
            <MessageGroupForm friendsList={friendsList} onMakeNewGroup={this.makeNewGroup}/>
            <MessageGroupList messageGroups={messageGroups} onItemClick={this.populateMessageFeed} />
          </div>
          <div className="col-lg-8">
            { currentGroupFeed &&
              <MessageFeed feed={currentGroupFeed} sendMessage={this.sendMessage} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default MessagePage;
