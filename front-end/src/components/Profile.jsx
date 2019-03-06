import React, { Component } from 'react';
//import { AppRegistry, Text, StyleSheet } from 'react-native';

import Jumbotron from 'react-bootstrap/Jumbotron';

class Profile extends Component {

  

  render() {
    const { user } = this.props;
    
    return (
      <div>
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
  }

}

export default Profile;
