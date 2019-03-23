import React, { Component } from 'react';

class ImageInput extends Component {

  render() {
    return (
      <React.Fragment>
        <input
          onChange={(e) => this.props.handleChange(e)}
          id="post-image"
          type="file" name="image"
          className="input-file"
          accept="image/gif, image/png, image/jpeg" />
        <label for="post-image"><i className="fa fa-upload" aria-hidden="true"></i>Choose an image...</label>
      </React.Fragment>
    );
  }
}

export default ImageInput;
