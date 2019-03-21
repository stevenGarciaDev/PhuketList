import React from 'react';
import Form from './common/form';
import Joi from "joi-browser";
import { createPost } from '../services/postService';

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
    image: Joi.string().allow(null, '')
  };

  doSubmit = async () => {
    // get data and make post request,
    const { taskId } = this.props;
    const jwt = localStorage.getItem("token");

    try {
      const { text, image } = this.state.data;
      const data = await createPost(text, image, taskId, jwt);
      this.props.onNewPost(data);
      console.log(data);
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
            {this.renderButton("Post", "post-btn", "btn btn-info btn-block")}
          </div>
        </form>
      </div>
    )
  }
}

export default PostForm;
