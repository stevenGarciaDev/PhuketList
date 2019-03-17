import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {
 
  updateProfile
} from "../services/userService";

import { getCurrentUser } from "../services/authService";

import axios from 'axios';
import { apiUrl } from "../config.json";

//import { AppRegistry, Text, StyleSheet } from 'react-native';

const apiEndpoint = apiUrl + "/users";

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }








  handleUpdate = (bio, bioText) => {
    //const originalList = this.props;
    //const updatedList = [...this.props];
    //const index = updatedList.indexOf(getCurrentUser());
    //updatedList[index] = { bio: bioText };
    //this.setState({ listItems: updatedList });

    try {
      const user2 = getCurrentUser();
      const jwt = localStorage.getItem("token");
      
      updateProfile(user2, bio, bioText, jwt);
    } catch (ex) {
      alert("Unable to update the profile.");
      //this.setState({ listItems: originalList });
    }
  };


   //profileUpdate = async (bio) =>
  //{
    //const user = getCurrentUser();
   // await axios.put(  apiEndpoint + "/" + bio, "zxsddsd");
    //const user = getCurrentUser();
    
  //}



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
                   {this.handleUpdate(user.bio, "bioText") } 
                   <div>
                   {user.bio} 
                   
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
                  {user.bio}
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
