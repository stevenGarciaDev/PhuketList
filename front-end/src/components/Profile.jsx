import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {

  updateProfile, getUserBIO, updatePhotoFile, getUserPHOTO
} from "../services/userService";

import { getCurrentUser } from "../services/authService";

import Form from 'react-bootstrap/Form';
const $ = window.$;


//import { AppRegistry, Text, StyleSheet } from 'react-native';

//const URL_Images = "/Phukitlist_New/front-end/src/assets/images/dog1-sq.jpg"; // '../assets/images/jackie-tsang-458443-unsplash.jpg'\
//const olol = document.images;

class Profile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      bio: "",
      image: null,
      imageSrc: "",
      photo: ""

    }
    this.inputRef = null;
    

    
  }

  async componentDidMount() {
    const user = getCurrentUser();
    const theBIO = await getUserBIO(user);
    const thePhoto = await getUserPHOTO(user);
    this.setState({bio: theBIO });
    this.setState({photo: thePhoto });
  }




  toggleEdit = () => {
    //console.log( );

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
        this.setState({bio: this.inputRef.value });

      
        this.toggleEdit();
      
      
    } catch (ex) {
      alert("Unable to update the profile.");
   
    }

    
  }; 

 







 imageUpload= evt =>{


  try {
    var f = evt.target.files[0]; // FileList object
    var reader = new FileReader();
    var thisProfile = this;
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        var binaryData = e.target.result;
        //Converting Binary Data to base 64
        var base64String = window.btoa(binaryData);
  
        const user = getCurrentUser();
        const jwt = localStorage.getItem("token");
  
  
  
        
        updatePhotoFile(user, base64String, jwt);
        thisProfile.setState({photo: base64String});
  
        
        alert('File converted to base64 successfuly!\nCheck in Textarea');
      };
    })(f);
    // Read in the image file as a data URL.
    reader.readAsBinaryString(f);
  } catch (ex)
  {

  }
  
}



  


/////<button className="btn btn-success" onClick={() => this.toggleEdit() }>Save Changes</button>
////// <textarea className="form-control" />     <img src =  />   dog1-sq  <img className="profile-img" />

  displayProfile = () => {
    const { isEditing } = this.state;
    const { user } = this.props;
    

    if (isEditing) {

      return (
        <div>
                    <div className="profile-container">

             <div className="profile-headshot-container">

             
                

                <p className="profile-name">{user.name}</p>
              
                
                <div>
                <input type='file' onChange= { this.imageUpload} accept="image/*"  />
                  <img id="blah"  alt="No Image" width = {75} height = {75}  />
                </div>

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
                 
              <div> 
                   <img src = {"data:image/jpeg;base64," + this.state.photo} width = {150} height = {150}  />
            
            </div>


                 <p className="profile-name">{user.name}</p>

                <div> {this.state.bio}  
            
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
