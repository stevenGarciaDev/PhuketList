import React, { Component } from 'react';

class TaskName extends Component {

  displayEditableName = () => {
    let taskName = this.props.task.name;

    if (window.innerWidth <= 400) {
      return (
        <div>
          <input type="text"
                 className="form-control"
                 defaultValue={taskName} />
        </div>
      );
    }

    return (
      <input type="text"
             className="form-control"
             defaultValue={taskName}
             style={{ width: 600 }} />
    );

  }

  displayFormattedName = () => {
    let taskName = this.props.task.name;
    let isCompleted = this.props.task.isCompleted;

    let classStyles = "task-name";
    if (isCompleted) classStyles += " completed-task";

    // if browser size is less than n,
    // then only display c chars
    // else display full size



    if (window.innerWidth <= 400 && taskName.length > 13) {
      taskName = `${taskName.substring(0, 9)}...`;

      return (
        <span className={classStyles}>{taskName}</span>
      );
    }

    return (
      <span className={classStyles}>{taskName}</span>
    );
  }

  render() {
    const { isEditing } = this.props;
    return (
      <div>
        { isEditing ? this.displayEditableName() : this.displayFormattedName() }
      </div>
    );
  }
}

export default TaskName;
