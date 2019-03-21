import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {

  updateProfile, getUserBIO
} from "../services/userService";

import { getCurrentUser } from "../services/authService";

import Form from 'react-bootstrap/Form';



//import { AppRegistry, Text, StyleSheet } from 'react-native';


class Profile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      bio: "",
      pictures: []
    }
    this.inputRef = null;
    this.onDrop = this.onDrop.bind(this);
    //UserBio = this.setBIO();
    
  }

  async componentDidMount() {
    const user = getCurrentUser();
    const theBIO = await getUserBIO(user);
    this.setState({bio: theBIO });
  }

  toggleEdit = () => {
    //console.log( );

    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
    console.log(picture);
}



  handleUpdate = (e) => {
    e.preventDefault();
    


    try {

      
        const user = getCurrentUser();
        const jwt = localStorage.getItem("token");

        const a = updateProfile(user, this.inputRef.value, jwt);

        
        this.setState({bio: this.inputRef.value });
      
        this.toggleEdit();
      
      
    } catch (ex) {
      alert("Unable to update the profile.");
   
    }

    
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
                   {this.state.bio}

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

                <div> {this.state.bio} </div>
                  
                 

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
