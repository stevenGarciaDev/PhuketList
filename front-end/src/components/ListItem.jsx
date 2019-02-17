import React, { Component } from 'react';
import OptionsToolbar from './OptionsToolbar';

class ListItem extends Component {

  // constructor(props) {
  //   super(props);
  // }

  displayFormattedName() {
    let { taskName } = this.props;

    // if browser size is less than n,
    // then only display c chars
    // else display full size

    if (window.innerWidth <= 400 && taskName.length > 13) {
      taskName = `${taskName.substring(0, 9)}...`;

      return (
        <span className="task-name">{taskName}</span>
      );
    }

    return (
      <span className="task-name">{this.props.taskName}</span>
    );
  }

  render() {
    return (
      <React.Fragment>
        <li className="ListItem">

          {this.displayFormattedName()}

          <OptionsToolbar />

        </li>
      </React.Fragment>
    );
  }
}

export default ListItem;
