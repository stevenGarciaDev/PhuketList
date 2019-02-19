import React, { Component } from 'react';
import TaskName from './TaskName';
import OptionsToolbar from './OptionsToolbar';

class ListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  handleEditText = () => {
    console.log('handle edit text');
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  render() {
    return (
      <React.Fragment>
        <li className="ListItem">

          <TaskName isEditing={this.state.isEditing} taskName={this.props.taskName} />
          <OptionsToolbar isEditing={this.state.isEditing}
                          onEdit={this.handleEditText} />

        </li>
      </React.Fragment>
    );
  }
}

export default ListItem;
