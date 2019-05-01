import React, { Component } from 'react';
import MessageListItem from './MessageListItem';
import { createNewGroup } from '../services/messageService';
import { retrieveUserId } from '../services/userService';
import { getCurrentUser } from '../services/authService';

class MessageGroupList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messageGroups: [],
      isCreatingGroup: false,
      buttonText: 'Start a new group',
      membersToAdd: [],
      memberNameToAdd: ""
    };
  }

  componentDidMount = async () => {
    // get message groups for this user
    // const user = await getCurrentUser();
    // const res = await retrieveMessageGroups(user);
    // console.log("res is ", res);
  }

  onMemberUpdate = (e) => {
    const memberNameToAdd = e.target.value;
    this.setState({ memberNameToAdd });
  }

  addNextMember = async () => {
    const { memberNameToAdd } = this.state;
    const membersToAdd = [ ...this.state.membersToAdd ];
    const res = await retrieveUserId(memberNameToAdd);
    console.log("addNextMember");
    const userId = res.data[0]._id;
    console.log("the user id is ", userId);
    membersToAdd.push(userId);
    console.log("membersToAdd", membersToAdd);
    this.setState({ memberNameToAdd: "", membersToAdd });
  }

  handleNewGroup = () => {
    let { isCreatingGroup, membersToAdd, buttonText } = this.state;

    isCreatingGroup = !isCreatingGroup;
    if (isCreatingGroup) {
      buttonText = "Close Group";
    } else {
        this.makeNewGroup(membersToAdd);
        buttonText = "Start a new group";
        membersToAdd = [];
    }
    this.setState({ isCreatingGroup, buttonText, membersToAdd });
  }

  makeNewGroup = async (members) => {
    const user = await getCurrentUser();
    members.push(user._id);
    console.log("@members", members);

    if (members.length > 1) {
      console.log("++the members are ", members);
      const newGroup = await createNewGroup(members);
      this.props.updateGroupList(newGroup);
      console.log("new group is ", newGroup);
    } else {
      console.log("--members", members);
    }
  }

  render() {
    const { buttonText, isCreatingGroup } = this.state;
    const { messageGroups } = this.props;

    return (
      <div>
         <div className="new-group-container">
          <button onClick={this.handleNewGroup} className="btn btn-success new-group-item">{buttonText}</button>
          { isCreatingGroup &&
            <div>
              <input type="text" onChange={this.onMemberUpdate} className="add-member-input" placeholder="Member's name" />
              <button onClick={() => this.addNextMember()} className="btn btn-info">Add</button>
            </div>
          }
         </div>

         <div className="messages-list">
          <div>
            { messageGroups &&
              messageGroups.map(group => (
                <MessageListItem key={group._id} group={group} />
              )
            )}

          </div>
         </div>
      </div>
    );
  }
}

export default MessageGroupList;
