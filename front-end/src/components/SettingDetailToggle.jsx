import React, { Component } from 'react';

class SettingDetailToggle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      displayName: this.props.displayName,
      settingValue: this.props.settingValue,
      settingProperty: this.props.settingProperty,
      detailType: this.props.detailType,
    };
  }

  toggleEdit = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  render() {
    const {
      isEditing,
      displayName,
      settingValue,
      detailType
    } = this.state;

    return (
      <React.Fragment>
        <tr>
          <td>{displayName}</td>
          <td className="settingsValue">{settingValue}</td>
          <td className="settings-change-btn">
            { isEditing ?
                <i
                  className="fa fa-toggle-on fa-2x"
                  aria-hidden="true"
                  onClick={this.toggleEdit}>
                </i>
              :
                <i onClick={this.toggleEdit} className="fa fa-toggle-off fa-2x" aria-hidden="true"></i>
            }
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default SettingDetailToggle;
