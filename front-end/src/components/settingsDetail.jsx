import React, { Component } from 'react';
import { getCurrentUser } from "../services/authService";
import { InputGroup } from 'react-bootstrap';
class SettingDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      settingProperty: this.props.settingProperty,
      settingValue: this.props.settingValue,
      detailType: this.props.detailType
    };
    //console.log(this.props.settingValue);
  }

  componentDidMount() {
    let user = getCurrentUser();
    if(this.settingProperty === "Full Name")
      console.log(user.name);
    else console.log("testing");
    // get current user,
    // populate the field based on settingProperty
  }

  toggleEdit = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
    if(this.state.settingProperty === "Account Privacy"){
      if(this.state.settingValue === "Public"){
        //change db here
        this.state.settingValue = "Private";
      }
      else  this.state.settingValue = "Public";
    }
    if(this.state.settingProperty === "Account Status"){
      if(this.state.settingValue === "Active"){
        //change db here
        this.state.settingValue = "Inactive";
      }
      else  this.state.settingValue = "Active";
    }
  }

  displayRow = () => {
    const {
      isEditing,
      settingProperty,
      settingValue,
      detailType
    } = this.state;
    console.log({settingValue})
    const isToggle = detailType != 'content';

    if (isEditing) {
      return (
        <tr>
          <td>{settingProperty}</td>
          <td className="settingsValue">
            {isToggle ?
              settingValue
              :
              <input type="text" className="form-control" value={settingValue}/>
            }
          </td>

          <td className="settings-change-btn">
            {isToggle ?
              <i onClick={this.toggleEdit} className="fa fa-toggle-on fa-2x" aria-hidden="true"></i>
              :
              <i onClick={this.toggleEdit} className="fa fa-check-circle-o fa-2x" aria-hidden="true"></i>
            }
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td>{settingProperty}</td>
          <td className="settingsValue">{settingValue}</td>
          <td className="settings-change-btn">
            {isToggle ?
            <i onClick={this.toggleEdit} className="fa fa-toggle-off fa-2x" aria-hidden="true"></i>
            :
            <i onClick={this.toggleEdit} className="fa fa-pencil fa-2x" aria-hidden="true"></i>
          }
          </td>
        </tr>
      );
    }
    
  }

  render() {
    return (
      <React.Fragment>
        { this.displayRow() }
      </React.Fragment>
    );
  }
}

export default SettingDetail;
