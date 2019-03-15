import React, { Component } from 'react';
//import { AppRegistry, Text, StyleSheet } from 'react-native';

import Jumbotron from 'react-bootstrap/Jumbotron';

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
          <div className="profile-btn-container">
            <button className="btn btn-success" onClick={() => this.toggleEdit()}>Save Changes</button>
          </div>

           <div>
                 {`${user.name}'s Profile` }
           </div>

           <div>
                  Your Bio
                    <div>
                    {`${user.bio}` }
                    </div>
           </div>

           <div>
              Pictures
           </div>

        </div>
      );

    } else {

        return (
          <div>
            <div className="profile-btn-container">
              <button className="btn btn-info" onClick={() => this.toggleEdit()}>Edit Profile</button>
            </div>

             <div className="profile-">
                   {`${user.name}'s Profile` }
             </div>

             <div>
                    Your Bio
                      <div>
                      {`${user.bio}` }
                      </div>
             </div>

             <div>
                Pictures
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
