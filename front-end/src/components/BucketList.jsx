import React, { Component } from 'react';
import ListItem from './ListItem';
import { getListItems, findOrCreateTask, removeTask, toggleComplete, updateTask } from '../services/bucketListService';
import { getCurrentUser } from '../services/authService';

// max length for taskName is 60 char
class BucketList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listItems: [],
    }
  }

  async componentDidMount() {
    // get bucket list items
    const user = getCurrentUser();
    const jwt = localStorage.getItem('token');

    // need to pass request headers
    const response = await getListItems(user, jwt);
    const listItems = response.data[0].listItems;
    this.setState({ listItems });
  }

  handleAdd = () => {
    const user = getCurrentUser();
    const newTaskName = document.getElementById('new_task').value;
    const jwt = localStorage.getItem('token');

    // create a new list item
    const response = findOrCreateTask(user, newTaskName, jwt);
    const listItems = response.data[0].listItems;
    this.setState({ listItems });
  }

  handleUpdate = (item, newText) => {
    const user = getCurrentUser();
    const jwt = localStorage.getItem('token');

    const response = updateTask(user, item, newText, jwt);
    console.log(typeof response);

    response.then(result => {
      const listItems = result.data;
      this.setState({ listItems });
    });
  }

  handleDelete = async (item) => {
    if ( this.confirmDelete(item) ) {
      const user = getCurrentUser();
      const jwt = localStorage.getItem('token');

      const response = await removeTask(user, item, jwt);
      const listItems = response.data;
      this.setState({ listItems });
    }
  }

  handleCompleted = async (item) => {
    const user = getCurrentUser();
    const jwt = localStorage.getItem('token');

    const response = await toggleComplete(user, item, jwt);
    const listItems = response.data;
    this.setState({ listItems });
  }

  confirmDelete = (item) => {
    const answer = window.confirm(`Are you sure you want to delete task, "${item.taskName}?"`);
    if (answer) {
      return true;
    }
    return false;
  }

  render() {
    const { listItems } = this.state;
    const { user } = this.props;

    return (
      <div>
        <div className="jumbotron text-center" id="bucket-list-jumbotron">
          <div className="jumbotron-content">
            <h1 className="page-title"> {`${user.name}'s bucket list.`}</h1>
            <h2 className="sub-header">What have you always wanted to do?</h2>

            <form onSubmit={this.handleAdd} className="input-group col-md-6 col-md-offset-3">
              <input type="text" name="new_task" id="new_task" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
              <div className="input-group-append">
                <button className="btn btn-outline-success" type="submit">Add New Task</button>
              </div>
            </form>
          </div>
        </div>

        <div>
          <p>{`There are currently ${listItems.length} items in your bucket list`}</p>
          <ul>
            {listItems.length > 0 && listItems.map(item => (
              <ListItem key={item._id}
                        task={item}
                        onDelete={this.handleDelete}
                        onComplete={this.handleCompleted}
                        onUpdate={this.handleUpdate}
              />
            ))}
          </ul>
        </div>

      </div>
    );
  }
}

export default BucketList;
