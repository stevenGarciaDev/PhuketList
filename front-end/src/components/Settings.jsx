import React, { Component } from 'react';
import SettingDetailInput from './SettingDetailInput';
import SettingDetailToggle from './SettingDetailToggle';
import { getCurrentUser } from '../services/authService';
import { updateSettingDetail } from '../services/userService';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: getCurrentUser()
    }
  }

  handleUpdate = (detailName, value) => {
    console.log("detail name is ", detailName);
    console.log("value is ", value);
    const jwt = localStorage.getItem("token");
    const response = updateSettingDetail(this.state.user, detailName, value, jwt);
  }

  render() {
    const { user } = this.state;

    return (
      <div className="container" id="body-wrapper">
       <h1>Account Settings</h1>

       <table className="table settings-container">

        <SettingDetailInput
          displayName="Full Name"
          settingProperty="name"
          settingValue={user.name}
          onUpdate={this.handleUpdate} />

        <SettingDetailInput
          displayName="Email"
          settingProperty="email"
          settingValue={user.email}
          onUpdate={this.handleUpdate} />

        <SettingDetailToggle
          displayName = "Account Privacy"
          settingProperty= "isPrivateProfile"
          settingValue={user.isPrivateProfile ? 'Private' : 'Public' }
          onUpdate={this.handleUpdate}
        />

        <SettingDetailToggle
          displayName="Account Status"
          settingProperty="isActiveAccount"
          settingValue={user.isActiveAccount ? 'Active' : 'NonActive' }
          onUpdate={this.handleUpdate}
        />

        </table>
      </div>
    );
  }

}

export default Settings;
