import React, { Component } from 'react';
import BucketList from '../components/BucketList';

class MyBucketList extends Component {

  render() {
    return (
      <div>
        <div className="jumbotron text-center" id="bucket-list-jumbotron">
          <h1 className="page-title">My Bucket List</h1>
          <h2 className="sub-header">What have you always wanted to do?</h2>

          <div className="input-group col-md-6 col-md-offset-3">
            <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
            <button className="btn btn-outline-success" type="submit">Add New Task</button>
          </div>
        </div>

        <BucketList />
      </div>
    );
  }
}

export default MyBucketList;
