import React from 'react';
import Joi from "joi-browser";
import { createComment } from '../services/postService';
import Form from './common/form';

class CommentForm extends Form {

  constructor(props) {
    super(props);
    this.state = {
      data: { text: "" },
      errors: {},
      postId: this.props.postId
    };
  }

  schema = {
    text: Joi.string().max(144).required()
  };

  doSubmit = async () => {
    const { text } = this.state.data;
    const { postId } = this.props;
    const jwt = localStorage.getItem("token");

    try {
      const data = await createComment(text, postId, jwt);
    } catch (ex) {
      console.log("Unable to create comment");
    }
  };

  render() {
    return (
      <div className="comment-container">
        <form onSubmit={this.handleSubmit} className="comment-input">
          {this.renderInput("text", "", "text", "Add a comment...")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default CommentForm;
