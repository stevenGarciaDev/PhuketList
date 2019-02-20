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

  updateItemName = (item) => {
    console.log("Handle update");

    this.toggleEditMode();
    /*
    check mark icon is clicked

      want to read the value of the input,
      and update the name of the list item


    */
  }

  toggleEditMode = () => {
    console.log('handle edit text');
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  retreiveUpdatedText = () => {

  }

  render() {
    const { task } = this.props;
    return (
      <React.Fragment>
        <li className="ListItem">

          <TaskName isEditing={this.state.isEditing}
                    task={task}
                    />
          <OptionsToolbar isEditing={this.state.isEditing}
                          onEdit={this.toggleEditMode}
                          onDelete={this.props.onDelete}
                          onUpdate={this.props.onUpdate}
                          onComplete={this.props.onComplete}
                          item={task} />
        </li>
      </React.Fragment>
    );
  }
}

export default ListItem;
