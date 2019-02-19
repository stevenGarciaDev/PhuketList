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
    const { task } = this.props;
    return (
      <React.Fragment>
        <li className="ListItem">

          <TaskName isEditing={this.state.isEditing}
                    taskName={task.name} />
          <OptionsToolbar isEditing={this.state.isEditing}
                          onEdit={this.handleEditText}
                          onDelete={this.props.onDelete}
                          item={task} />

        </li>
      </React.Fragment>
    );
  }
}

export default ListItem;
