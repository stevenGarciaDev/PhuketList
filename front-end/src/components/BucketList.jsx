import React, { Component } from 'react';
import ListItem from './ListItem';

// max length for taskName is 60 char
class BucketList extends Component {

  constructor() {
    super();
    this.state = {
      listItems: [
        {
          _id: 1,
          name: "Skydiving",
          isCompleted: false
        },
        {
          _id: 2,
          name: "Travel Europe",
          isCompleted: false
        },
        {
          _id: 3,
          name: "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
          isCompleted: false
        }
      ]
    }
  }

  handleUpdate = (item, newText) => {
    let listItems = [...this.state.listItems];
    const indexToUpdate = listItems.indexOf(item);
    listItems[indexToUpdate].name = newText;
    this.setState({ listItems });
  }

  handleDelete = (item) => {
    let currentItems = [...this.state.listItems];
    const indexToDelete = currentItems.indexOf(item);
    currentItems.splice( indexToDelete, 1)
    this.setState({ listItems: currentItems });
  }

  handleCompleted = (item) => {
    let listItems = [...this.state.listItems];
    const indexToUpdate = listItems.indexOf(item);
    const prevState = listItems[indexToUpdate].isCompleted;
    listItems[indexToUpdate].isCompleted = !prevState;
    this.setState({ listItems });
  }

  render() {
    return (
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
    );
  }
}

export default BucketList;
