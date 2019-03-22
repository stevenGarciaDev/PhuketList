import React, { Component } from 'react';
import SettingsDetail from './settingsDetail';
import { getCurrentUser } from "../services/authService";
class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      accountPrivay: '',
      accountstatus: '',
      
    };
  }

  async componentDidMount() {
    let user =await getCurrentUser();
    //
    console.log(user.email);
    // get current user,
    // populate the field based on settingProperty
  }
  render() {
    let user = getCurrentUser();
    if(user){
      this.state.name = user.name;
      this.state.email = user.email;
      if(user.isPrivateProfile)
      this.state.accountPrivay = 'Private';
      else  this.state.accountPrivay = 'Public';
      if(user.isActiveAccount)
      this.state.accountstatus = 'Active';
      else this.state.accountstatus ="Inactive";
    }
    //const name = this.name;
    const {
      name,
      email,
      accountPrivay,
      accountstatus,
     } = this.state; 
    console.log(this.state);
    return (
      <div className="container" id="body-wrapper">
       <h1>Account Settings</h1>

       <table className="table settings-container">
        <SettingsDetail settingProperty="Full Name" settingValue ={name} detailType="content" />
        <SettingsDetail settingProperty="Email" settingValue={email} detailType="content" />
        <SettingsDetail settingProperty="Account Privacy" settingValue={accountPrivay} detailType="toggle" />
        <SettingsDetail settingProperty="Account Status" settingValue={accountstatus} detailType="toggle" />

       </table>
      </div>
    );
  }

}

export default Settings;
