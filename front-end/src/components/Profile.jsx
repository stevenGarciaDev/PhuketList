import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
//import { AppRegistry, Text, StyleSheet } from 'react-native';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }

  toggleEdit = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  displayProfile = () => {
    const { isEditing } = this.state;
    const { user } = this.props;

    if (isEditing) {

      return (
        <div>
          <div className="jumbotron profile-container">
             <div className="profile-headshot-container">
                <img className="profile-img" />

                <p className="profile-name">{user.name}</p>

                <div>
                   <textarea />
                   <div>
                     I like peanut butter!
                   </div>

                </div>
             </div>

             <div className="profile-btn-container">
               <button className="btn btn-success" onClick={() => this.toggleEdit()}>Save Changes</button>
             </div>
           </div>
        </div>
      );

    } else {

        return (
          <div>
            <div className="jumbotron profile-container">

              <div className="profile-headshot-container">
                 <img className="profile-img" />

                 <p className="profile-name">{user.name}</p>

                  <div>
                    I like peanut butter!
                  </div>

              </div>

               <div className="profile-btn-container">
                 <button className="btn btn-info" onClick={() => this.toggleEdit()}>Edit Profile</button>
               </div>
            </div>
          </div>
      );
    }
  }

  render() {

    return (
      <div>
        { this.displayProfile() }
      </div>

    );
  }

}

export default Profile;
