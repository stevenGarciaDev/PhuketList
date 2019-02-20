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

  updateItemName = (item) => {
    console.log("Handle update");
  }

  handleDelete = (item) => {
    let currentItems = [...this.state.listItems];
    let indexToDelete = currentItems.indexOf(item);
    currentItems.splice( indexToDelete, 1)
    this.setState({ listItems: currentItems });
  }

  handleCompleted = (item) => {
    let currentItems = [...this.state.listItems];
    let indexToUpdate = currentItems.indexOf(item);
    currentItems[indexToUpdate].isCompleted = true;
    this.setState({ listItems: currentItems });
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
                      onUpdate={this.updateItemName} />
          ))}
        </ul>
      </div>
    );
  }
}

export default BucketList;
