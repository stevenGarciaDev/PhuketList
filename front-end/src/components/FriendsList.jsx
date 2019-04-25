import React, { Component } from 'react';
import FriendInfoItem from './FriendInfoItem';
import { getPotentialFriends } from '../services/friendshipService';

class FriendsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      potentialFriends: [],
      currentView: 'find',
      friends: []
    };
  }

  componentDidMount = async () => {
    const potentialFriends = await getPotentialFriends();
    console.log('potentialFriends are', potentialFriends);
    this.setState({ potentialFriends });
  }

  toggleSegmentBtn = (text) => {
    const { currentView } = this.state;
    if (currentView === text) return;
    const updatedView = currentView === 'find' ? 'edit' : 'find';
    this.setState({ currentView: updatedView });
  }

  render() {
    const { currentView, potentialFriends, friends } = this.state;
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
        <div className="segmentBtn-container">
          <button className={findFriendsClass} onClick={() => this.toggleSegmentBtn('find')}>Find Friends</button>
          <button className={editFriendsClass} onClick={() => this.toggleSegmentBtn('edit')}>Edit Friends List</button>
        </div>

        { currentView === 'find' ?

          <div className="container friends-list-content">
            <input type="text" className="form-control col-md-6 offset-md-3" placeholder="Search by name..." />
            <h2>People You May Know</h2>

            <div className="row">
              { potentialFriends.length > 0 &&
                potentialFriends.map(user => (
                  <FriendInfoItem user={user} />
                ))
              }
            </div>
          </div>

        :

          <div>

            { friends.length > 0 ?
              <h2>Friends</h2>
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
