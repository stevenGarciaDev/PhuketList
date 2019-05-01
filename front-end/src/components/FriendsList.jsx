import React, { Component } from 'react';
import FriendInfoItem from './FriendInfoItem';
import AlertMessage from './AlertMessage';
import {
  getPotentialFriends,
  getFriends,
  addUser,
  acceptFriend,
  removeFriend } from "../services/friendshipService";
import { getCurrentUser } from '../services/authService';
import { getUserbyEmail } from '../services/userService';

class FriendsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      potentialFriends: [],
      filteredPotentialFriends: [],
      currentView: 'find',
      friends: [],
      displayAlert: false,
      alertMessage: ""
    };
  }

  componentDidMount = async () => {
    const currentUser = getCurrentUser();
    const friends = await getFriends(currentUser.email);
    let potentialFriends = await getPotentialFriends(currentUser.email);

    potentialFriends = potentialFriends.filter(f => f.name !== currentUser.name);

    let frData = [];
    for (let i = 0; i < friends.data.length; i++){
      let user = await getUserbyEmail(friends.data[i].userEmail);
      var obj = {'email':user.data.email,'name':user.data.name,'photo':user.data.photo,'status':friends.data[i].status};
      frData.push(obj);
    }
    this.setState({friends:frData, potentialFriends, filteredPotentialFriends: potentialFriends });
  }

  toggleSegmentBtn = (text) => {
    const { currentView } = this.state;
    if (currentView === text) return;
    const updatedView = currentView === 'find' ? 'edit' : 'find';
    this.setState({ currentView: updatedView });
  }

  filterFriendOptions = (e) => {
    let potentialFriends = [ ...this.state.potentialFriends ];
    if (e.target.value === "") {
      this.setState({ filteredPotentialFriends: potentialFriends});
      return;
    }
    const regex = new RegExp(`^${e.target.value.toLowerCase()}`, 'g');
    const filteredPotentialFriends = potentialFriends.filter(f => f.name.toLowerCase().match(regex));
    this.setState({ filteredPotentialFriends });
  }

  handleEditFriendStatus = async (e, user) => {
    console.log("user is ", user);

    e.preventDefault();

    let {
      displayAlert,
      alertMessage,
      currentView,
      filteredPotentialFriends
     } = this.state;
    const currentUser = getCurrentUser();
    const emailuse = currentUser.email;

    switch (user.status) {
      case "Accept":
        acceptFriend(user.email, user.id, emailuse);
        alertMessage = `Accepted Friend Request from ${user.name}`
        displayAlert = true;
        break;
      case "Add Friend":
        addUser(user.email, user.userid, emailuse);
        alertMessage = `Sent Friend Request to ${user.name}`
        displayAlert = true;
        filteredPotentialFriends = filteredPotentialFriends.filter(f => f.name !== user.name);
        break;
      case "Remove":
        removeFriend(user.email, user.id, emailuse);
        alertMessage = `Rejected Friend Request to ${user.name}`
        displayAlert = true;
        break;
      case "Pending":
        alertMessage = ""
        displayAlert = false;
        break;
      default:
        alertMessage = ""
        displayAlert = false;
        break;
    }

    this.setState({ displayAlert, alertMessage, filteredPotentialFriends });
  }

  render() {
    const { currentView, potentialFriends, filteredPotentialFriends, friends, displayAlert, alertMessage } = this.state;
    let findFriendsClass;
    let editFriendsClass;

    if (currentView === 'find') {
      findFriendsClass = "btn btn-primary";
      editFriendsClass = "btn btn-light";
    } else {
      findFriendsClass = "btn btn-light";
      editFriendsClass = "btn btn-primary";
    }

    return (
      <div>
        { displayAlert && <AlertMessage text={alertMessage} />}

        <div className="segmentBtn-container">
          <button className={findFriendsClass} onClick={() => this.toggleSegmentBtn('find')}>Find Friends</button>
          <button className={editFriendsClass} onClick={() => this.toggleSegmentBtn('edit')}>Edit Friends List</button>
        </div>

        { currentView === 'find' ?

          <div className="container friends-list-content">
            <input type="text"
              className="form-control col-md-6 offset-md-3"
              placeholder="Search by name..."
              onChange={(e) => this.filterFriendOptions(e)} />
            <h2 className="friends-page-title">People You May Know</h2>

            <div className="row">
              { filteredPotentialFriends.length > 0 &&
                filteredPotentialFriends.map(user => <FriendInfoItem
                                                key={user._id}
                                                user={user}
                                                onEditFriendStatus={this.handleEditFriendStatus} /> )
              }
            </div>
          </div>

        :

          <div>

            { friends.length > 0 ?
              <div className="container friends-list-content">
                <h2>Friends {friends.length}</h2>
                <div className="row">
                {
                  friends.map(user => <FriendInfoItem
                                        key={user._id}
                                        user={user}
                                        onEditFriendStatus={this.handleEditFriendStatus} />)
                }
                </div>
              </div>
            :
              <h2>Add bucket list tasks and begin adding friends!</h2>
            }

          </div>
        }

      </div>
    );
  }

}

export default FriendsList;
