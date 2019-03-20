import React from 'react';
import Form from './common/form';
import { createPost } from '../services/postService';
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
    image: Joi.string()
  };

  doSubmit = async () => {
    // get data and make post request,
    const { taskId } = this.props;
    const jwt = localStorage.getItem("token");

    try {
      const { text, image } = this.state.data;
      const response = await createPost(text, image, taskId, jwt);
      console.log(response);
    } catch (ex) {

    }
  };

  render() {
    return (
      <div className="new-post-container">

        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <div className="new-post-input">
            {this.renderInput("text", "", "text", "Add a new post...")}
          </div>
          <div className="new-post-input">
            {this.renderInput("image", "", "file", "")}
          </div>
          <div>
          <button id="post-btn" className="btn btn-info btn-block">Post</button>
          </div>
        </form>
      </div>
    )
  }
}

export default PostForm;
