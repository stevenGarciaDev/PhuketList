import React from 'react';
import Joi from "joi-browser";
import Form from './common/form';
import { createComment } from '../services/postService';

class CommentForm extends Form {

  constructor(props) {
    super(props);

    this.state = {
      data: { comment: "" },
      errors: {},
      taskId: this.props.taskId
    };
  }

  schema = {
    comment: Joi.string().max(144).required()
  };

  doSubmit = async () => {
    const jwt = localStorage.getItem("token");

    console.log("the task id is ", this.state.taskId);

    try {
      const { taskId, comment } = this.state.data;
      console.log(comment);
      await createComment(comment, taskId, jwt);
    } catch (ex) {
      console.log("could not create comment");
    }
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
