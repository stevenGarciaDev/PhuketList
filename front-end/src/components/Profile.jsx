import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {

  updateProfile, getUserBIO
} from "../services/userService";

import { getCurrentUser } from "../services/authService";

import Form from 'react-bootstrap/Form';


//import { AppRegistry, Text, StyleSheet } from 'react-native';
var UserBio = "";

class Profile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
    this.inputRef = null;
    //UserBio = this.setBIO();
  }

  

  toggleEdit = () => {
    //console.log("Toggle EDIT")

    this.setState({
      isEditing: !this.state.isEditing
    });
  }



  handleUpdate = (e) => {
    e.preventDefault();
    


    try {

      
        const user = getCurrentUser();
        const jwt = localStorage.getItem("token");

        const a = updateProfile(user, this.inputRef.value, jwt);
  
      
      this.toggleEdit();
      
      
    } catch (ex) {
      alert("Unable to update the profile.");
   
    }

    
  }; 


 
  setBIO = () => {
    

      const user = getCurrentUser();
     
      //getUserBIO(user);


   

   
    
    getUserBIO(user);
  };





/////<button className="btn btn-success" onClick={() => this.toggleEdit() }>Save Changes</button>
////// <textarea className="form-control" />

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
                  
                  <Form onSubmit={e => this.handleUpdate( e)}> 
                      <Form.Group >
                          
                          <Form.Control as="textarea" rows="3"   
                          ref={(ref) => {this.inputRef = ref}} type="text" />
                          <div></div>
                          
                          <div className="profile-btn-container">
                            <button className="btn btn-success" type="submit">Save Changes</button>
                        </div>
                        
                      </Form.Group>
                   </Form>
                
                   <div>
                 

                   </div>

                </div>
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

                <div>{this.setBIO()}</div>
                  
                 

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
