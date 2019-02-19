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
          name: "Skydiving"
        },
        {
          _id: 2,
          name: "Travel Europe"
        },
        {
          _id: 3,
          name: "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"
        }
      ]
    }
  }

  handleDelete = (item) => {
    let currentItems = [...this.state.listItems];
    let indexToDelete = currentItems.indexOf(item);
    currentItems.splice( indexToDelete, 1)
    console.log(`New list is ${currentItems}`);
    this.setState({ listItems: currentItems });
  }

  render() {
    return (
      <div>
        <ul>

          {this.state.listItems.map(item => <ListItem key={item._id}
                                                      task={item}
                                                      onDelete={this.handleDelete} /> )}

        </ul>
      </div>
    );
  }
}

export default BucketList;
