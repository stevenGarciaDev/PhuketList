import React, { Component } from 'react';
import SettingsDetail from './settingsDetail';
import { getCurrentUser } from '../services/authService';

class Settings extends Component {

  render() {
    const user = getCurrentUser();

    return (
      <div className="container" id="body-wrapper">
       <h1>Account Settings</h1>

       <table className="table settings-container">

        <SettingsDetail settingProperty="Full Name" settingValue={user.name} detailType="content" />
        <SettingsDetail settingProperty="Email" settingValue={user.email} detailType="content" />
        <SettingsDetail
          settingProperty="Account Privacy"
          settingValue={user.isPrivateProfile ? 'Private' : 'Public' }
          detailType="toggle"
        />
        <SettingsDetail
          settingProperty="Account Status"
          settingValue={user.isActiveAccount ? 'Active' : 'NonActive' }
          detailType="toggle"
        />

        </table>
      </div>
    );
  }

}

export default Settings;
