import React, { Component } from 'react';

class SettingDetail extends Component {

  constructor(props) {
    super(props);
    this.state {
      isEditing: false,
      settingProperty: this.props.settingProperty,
      settingValue: ""
    };
  }

  componentDidMount() {
    // get current user,
    // populate the field based on settingProperty
  }

  toggleEdit = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  displayRow = () => {
    const { isEditing, settingProperty, settingValue } = this.state;

    if (isEditing) {
      return (
        <tr>
          <td>{settingProperty}</td>
          <td>{settingValue}</td>
          <td>
            <button onClick="">Edit</button>
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td>{settingProperty}</td>
          <td><input type="text" value={settingValue}/></td>
          <td>
            <button onClick="">Apply</button>
          </td>
        </tr>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        { () => this.displayRow() }
      </React.Fragment>
    );
  }
}

export default SettingDetail;
