import React, { Component } from 'react';
import ListItem from './ListItem';
import { getListItems } from '../services/bucketListService';


// max length for taskName is 60 char
class BucketList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      listItems: []
    }
  }

  componentDidMount() {
    // get bucket list items
    console.log(this.state.user);
    let listItems = getListItems(this.state.user);
    this.setState({ listItems });
  }

  handleAdd = (item) => {
    let listItems = [...this.state.listItems];
    listItems.push(item);
    this.setState({ listItems });
  }

  handleUpdate = (item, newText) => {
    let listItems = [...this.state.listItems];
    const indexToUpdate = listItems.indexOf(item);
    listItems[indexToUpdate].name = newText;
    this.setState({ listItems });

  }

  handleDelete = (item) => {
    if ( this.confirmDelete(item) ) {
      let listItems = [...this.state.listItems];
      const indexToDelete = listItems.indexOf(item);
      listItems.splice( indexToDelete, 1)
      this.setState({ listItems });
    }
  }

  handleCompleted = (item) => {
    let listItems = [...this.state.listItems];
    const indexToUpdate = listItems.indexOf(item);
    const prevState = listItems[indexToUpdate].isCompleted;
    listItems[indexToUpdate].isCompleted = !prevState;
    this.setState({ listItems });
  }

  confirmDelete = (item) => {
    const answer = window.confirm(`Are you sure you want to delete task, "${item.name}?"`);
    if (answer) {
      return true;
    }
    return false;
  }

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

        <div>
          <ul>
            {this.state.listItems.map(item => (
              <ListItem key={item._id}
                        task={item}
                        onDelete={this.handleDelete}
                        onComplete={this.handleCompleted}
                        onUpdate={this.handleUpdate} />
            ))}
          </ul>
        </div>

      </div>
    );
  }
}

export default BucketList;
