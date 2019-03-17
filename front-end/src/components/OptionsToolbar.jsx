import React, { Component } from 'react';

class OptionsToolbar extends Component {

  constructor(props) {
    super(props);
  }

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
                 console.log(`Value is ${item._id}`);
                 this.props.onUpdate(
                   this.props.item,
                   document.getElementById(`${item._id}`).value
                 );
                 console.log(document.getElementById(`${item._id}`).value);
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
