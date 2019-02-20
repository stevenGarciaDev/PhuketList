import React, { Component } from 'react';

class OptionsToolbar extends Component {

  editText = () => {
    const { isEditing } = this.props;
    console.log("isEditing", isEditing);
    this.setState({
      isEditing: !isEditing
    });
  }

  displayOptions = () => {
    const { isEditing } = this.props;
    if (isEditing) {
      return (
        <React.Fragment>
          <span>
            <i className="fa fa-check fa-2x"
               aria-hidden="true"
               style={{ cursor: 'pointer' }}
               onClick={ () => this.props.onUpdate( this.props.item ) }></i>
          </span>

          <span>
            <i className="fa fa-times fa-2x"
               aria-hidden="true"
               style={{ cursor: 'pointer' }}
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
             style={{ cursor: 'pointer' }}
             onClick={ this.props.onEdit }></i>
        </span>

        <span>
          <i className="fa fa-check-circle-o fa-2x"
             style={{ cursor: 'pointer' }}
             aria-hidden="true"
             onClick={ () => this.props.onComplete( this.props.item) }></i>
        </span>

        <span>
          <i className="fa fa-trash fa-2x"
             aria-hidden="true"
             style={{ cursor: 'pointer' }}
             onClick={() => this.props.onDelete( this.props.item )}></i>
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
