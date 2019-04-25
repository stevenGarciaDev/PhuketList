import React, { Component } from 'react';

class ImageInput extends Component {

  render() {

    return (
      <React.Fragment>
        <input
          id="post-image"
          type="file"
          name="image"
          className="input-file"
          accept="image/gif, image/png, image/jpeg"
          onChange={this.props.onChange} />
        <label htmlFor="post-image">
          <i className="fa fa-upload" aria-hidden="true"></i>
          Choose an image...
        </label>
      </React.Fragment>
    );
  }
}

export default ImageInput;
