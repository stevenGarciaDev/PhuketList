import React, { Component } from 'react';

class OptionsToolbar extends Component {

  editText = () => {
    const { isEditing } = this.props;
    console.log("isEditing", isEditing);
    this.setState({
      isEditing: !isEditing
    });
  }

  markCompleted = () => {
    console.log('completed');
  }

  deleteTask = () => {
    console.log('delete task');
  }

  displayOptions = () => {
    const { isEditing } = this.props;
    if (isEditing) {
      return (
        <React.Fragment>
          <span>
            <i className="fa fa-check fa-2x"
               aria-hidden="true"></i>
          </span>

          <span>
            <i className="fa fa-times fa-2x"
               aria-hidden="true"
               onClick={ this.props.onEdit }></i>
          </span>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <span>
          <button
            className="btn btn-warning">Groups</button>
        </span>

        <span>
          <i className="fa fa-pencil-square-o fa-2x"
             aria-hidden="true"
             onClick={ this.props.onEdit }></i>
        </span>

        <span>
          <i className="fa fa-check-circle-o fa-2x"
             aria-hidden="true"
             onClick={() => this.markCompleted()}></i>
        </span>

        <span>
          <i className="fa fa-trash fa-2x"
             aria-hidden="true"
             onClick={() => this.deleteTask()}></i>
        </span>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="item-modify-options">

        {this.displayOptions()}

      </div>
    );
  }
}

export default OptionsToolbar;
