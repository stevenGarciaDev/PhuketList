import React, { Component } from 'react';

class MessageForm extends Component {

  render() {
    return (
      <form>
        <div className="message-form">
          <input type="text" className="form-control" placeholder="Message..." id="message-input" />
          <button type="submit" className="btn btn-info">Submit</button>
        </div>
      </form>
    );
  }
}

export default MessageForm;
