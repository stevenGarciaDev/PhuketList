import React from 'react';
import Form from './common/form';
import Joi from "joi-browser";

class PostForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { text: "", image: ""},
      errors: {}
    };
  }

  schema = {
    text: Joi.string()
      .max(255)
      .required(),
    photo: Joi.string()
  };

  doSubmit = async () => {

  };

  render() {
    return (
      <div className="new-post-container">

        <form onSubmit={this.handleSubmit}>
          <div className="new-post-input">
            {this.renderInput("text", "", "text", "Add a new post...")}
          </div>
          <span>
            <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
          </span>
          <div>
          <button id="post-btn" className="btn btn-info btn-block">Post</button>
          </div>
        </form>
      </div>
    )
  }
}

export default PostForm;
