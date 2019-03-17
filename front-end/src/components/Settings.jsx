import React, { Component } from 'react';

class Settings extends Component {

  render() {
    return (
      <div className="container">
       <h1>Account Settings</h1>

       <table className="table settings-container">
        <tr>
          <td>Full Name</td>
          <td>John Smith</td>
          <td>
            Edit
          </td>
        </tr>
        <tr>
          <td>Email</td>
          <td>email@gmail.com</td>
          <td>
            <button>Edit</button>
          </td>
        </tr>
        <tr>
          <td>Account Privacy</td>
          <td>Public</td>
          <td>
            <button>Edit</button>
          </td>
        </tr>
        <tr>
          <td>Account Status</td>
          <td>Active</td>
          <td>
            <button>Edit</button>
          </td>
        </tr>
       </table>
      </div>
    );
  }

}

export default Settings;
