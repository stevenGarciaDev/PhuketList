import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OptionsToolbar extends Component {

  displayOptions = () => {
    const { isEditing, item } = this.props;

    if (isEditing) {
      return (
        <React.Fragment>
          <span>
            <i className="fa fa-check fa-2x"
               aria-hidden="true"
               onClick={ (e) => {
                 e.preventDefault();
                 console.log(`Value is ${item.taskName}`);
                 this.props.onUpdate(
                   this.props.item,
                   document.getElementById(`${item.taskName}`).value
                 );
                 console.log(document.getElementById(`${item.taskName}`).value);
                 this.props.onEdit();
               }}></i>
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
          <Link to={`/taskgroup/${this.props.item._id}`}>
            <button className="btn btn-warning">Groups</button>
          </Link>
        </span>

        <span>
          <i className="fa fa-pencil-square-o fa-2x"
             aria-hidden="true"
             onClick={ this.props.onEdit }></i>
        </span>

        <span>
          <i className="fa fa-check-circle-o fa-2x"
             aria-hidden="true"
             onClick={ () => this.props.onComplete(item) }></i>
        </span>

        <span>
          <i className="fa fa-trash fa-2x"
             aria-hidden="true"
             onClick={() => this.props.onDelete(item )}></i>
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
