import React, { Component } from 'react';
import MessageListItem from './MessageListItem';
import { Link } from 'react-router-dom';
import MessageGroupForm from './MessageGroupForm';

class MessageGroupList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      unreadMessages: 0,
      isCreatingGroup: false,
      buttonText: 'Start a new group',
      membersToAdd: [],
    };
  }

  componentDidMount() {

  }

  handleNewGroup = () => {
    let { isCreatingGroup, membersToAdd, buttonText } = this.state;
    isCreatingGroup = !isCreatingGroup;
    if (isCreatingGroup) {
      buttonText = "Close Group";
    } else {
        buttonText = "Start a new group";
        membersToAdd = [];
    }

    this.setState({ isCreatingGroup, buttonText, membersToAdd });
  }

  render() {
    const { buttonText, unreadMessages, isCreatingGroup } = this.state;

    return (
      <div>
         <div className="new-group-container">
          <button onClick={this.handleNewGroup} className="btn btn-success new-group-item">{buttonText}</button>
          { isCreatingGroup &&
            <form>
              <input type="text" className="add-member-input" placeholder="John Snow" />
              <button className="btn btn-info">Add</button>
            </form>
          }
         </div>

         <div className="messages-list">
          <div>
            <MessageListItem />
            <MessageListItem />
            <MessageListItem />
            <MessageListItem />
            <MessageListItem />
          </div>
         </div>
      </div>
    );
  }
}

export default MessageGroupList;
