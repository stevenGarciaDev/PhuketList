import React, { Component } from 'react';
import SettingsDetail from './settingsDetail';

class Settings extends Component {

  render() {
    return (
      <div className="container" id="body-wrapper">
       <h1>Account Settings</h1>

       <table className="table settings-container">

        <SettingsDetail settingProperty="Full Name" settingValue="John Smith" detailType="content" />
        <SettingsDetail settingProperty="Email" settingValue="email@gmail.com" detailType="content" />
        <SettingsDetail settingProperty="Account Privacy" settingValue="Public"detailType="toggle" />
        <SettingsDetail settingProperty="Account Status" settingValue="Active" detailType="toggle" />

       </table>
      </div>
    );
  }

}

export default Settings;
