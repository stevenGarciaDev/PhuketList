import React, { Component } from 'react';
import Joi from "joi-browser";
import Form from './common/form';

class CommentForm extends Form {

  constructor(props) {
    super(props);
    this.state = {
      data: { comment: "" },
      errors: {}
    };
  }

  schema = {
    comment: Joi.string().max(144).required()
  };

  doSubmit = async () => {

  };

  render() {
    return (
      <div className="comment-container">
        <form onSubmit={this.handleSubmit} className="comment-input">
          {this.renderInput("comment", "", "text", "Add a comment...")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default CommentForm;
