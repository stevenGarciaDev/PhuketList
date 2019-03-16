import React, { Component } from "react";
import ListItem from "./ListItem";
import Downshift from "downshift";
import {
  getListItems,
  getLikeTasks,
  findOrCreateTask,
  removeTask,
  toggleComplete,
  updateTask
} from "../services/bucketListService";
import { getCurrentUser } from "../services/authService";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

// max length for taskName is 60 char
class BucketList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [],
      searchResults: [],
      loading: ""
    };
  }

  async componentDidMount() {
    // get bucket list items
    const user = getCurrentUser();
    const jwt = localStorage.getItem("token");

    // need to pass request headers
    const response = await getListItems(user, jwt);
    const listItems = response.data[0].listItems;
    this.setState({ listItems: listItems });
  }

  handleAdd = e => {
    e.preventDefault();

    const newTaskName = document.getElementById("new_task").value;
    const originalList = this.state.listItems;
    let updatedList = [...this.state.listItems];
    const newItem = { taskName: newTaskName, isCompleted: false };
    updatedList.push(newItem);
    this.setState({ listItems: updatedList });

    try {
      const user = getCurrentUser();
      const jwt = localStorage.getItem("token");

      // create a new list item
      findOrCreateTask(user, newTaskName, jwt);
    } catch (ex) {
      alert("Unable to add item.");
      this.setState({ listItems: originalList });
    }
  };

  handleUpdate = (item, newText) => {
    const originalList = this.state.listItems;
    const updatedList = [...this.state.listItems];
    const index = updatedList.indexOf(item);
    updatedList[index] = { taskName: newText, isCompleted: false };
    this.setState({ listItems: updatedList });

    try {
      const user = getCurrentUser();
      const jwt = localStorage.getItem("token");

      updateTask(user, item, newText, jwt);
    } catch (ex) {
      alert("Unable to update the list.");
      this.setState({ listItems: originalList });
    }
  };

  handleDelete = async item => {
    if (this.confirmDelete(item)) {
      const user = getCurrentUser();
      const jwt = localStorage.getItem("token");

      const response = await removeTask(user, item, jwt);
      const listItems = response.data;
      this.setState({ listItems: listItems });
    }
  };

  handleCompleted = async item => {
    const originalList = this.state.listItems;
    const modifiedList = [...this.state.listItems];
    const index = modifiedList.indexOf(item);
    modifiedList[index].isCompleted = !modifiedList[index].isCompleted;
    this.setState({ listItems: modifiedList });

    try {
      const user = getCurrentUser();
      const jwt = localStorage.getItem("token");

      const response = await toggleComplete(user, item, jwt);
      const listItems = response.data;
    } catch (ex) {
      this.setState({ listItems: originalList });
    }

  };

  confirmDelete = item => {
    const answer = window.confirm(
      `Are you sure you want to delete task, "${item.taskName}?"`
    );
    if (answer) {
      return true;
    }
    return false;
  };

  onChange = e => {
    if (!e) return;
    var searchInput = e.target.value;
    searchInput = searchInput.toLowerCase(); // Lowercase for uniform search
    if (searchInput.length > 1) {
      console.log("Searching: " + searchInput);
      const response = getLikeTasks(searchInput); // Query from
      response.then(
        function(results) {
          this.setState({ searchResults: results.data });
        }.bind(this)
      );
    }
    console.log(this.state.searchResults);
  };

  render() {
    const { user } = this.props;

    return (
      <div>
        <div className="jumbotron text-center" id="bucket-list-jumbotron">
          <div className="jumbotron-content">
            <h1 className="page-title"> {`${user.name}'s bucket list.`}</h1>
            <h2 className="sub-header">What have you always wanted to do?</h2>
            <SearchStyles>
              <Downshift
                itemToString={item => (item === null ? "" : item.title)}
                onChange={selection =>
                  (document.getElementById("new_task").value = `${
                    selection.taskName
                  }`)
                }
              >
                {({
                  getInputProps,
                  getItemProps,
                  getLabelProps,
                  getMenuProps,
                  isOpen,
                  inputValue,
                  highlightedIndex,
                  selectedItem
                }) => (
                  <form
                    onSubmit={this.handleAdd}
                    className="input-group col-md-6 col-md-offset-3"
                  >
                    <input
                      {...getInputProps({
                        type: "search",
                        placeholder: "Enter a bucket list item!",
                        id: "new_task",
                        name: "new_task",
                        className: this.state.loading ? "loading" : "",
                        onChange: e => {
                          e.persist();
                          this.onChange(e);
                        }
                      })}
                      autoComplete="off"
                      className="form-control"
                      aria-describedby="inputGroup-sizing-default"
                    />

                    <div className="input-group-append">
                      <button className="btn btn-outline-success" type="submit">
                        Add New Task
                      </button>
                    </div>
                    {isOpen && (
                      <DropDown>
                        {this.state.searchResults.map((item, index) => (
                          <DropDownItem
                            {...getItemProps({ item })}
                            key={item.taskName}
                            highlighted={index === highlightedIndex}
                          >
                            {item.taskName}
                          </DropDownItem>
                        ))}
                        {!this.state.searchResults.length &&
                          !this.state.loading && (
                            <DropDownItem>
                              {" "}
                              Nothing Found For: {inputValue}
                            </DropDownItem>
                          )}
                      </DropDown>
                    )}
                  </form>
                )}
              </Downshift>
            </SearchStyles>
          </div>
        </div>

        <div>
          <p>{`There are currently ${
            this.state.listItems.length
          } items in your bucket list`}</p>
          <ul>
            {this.state.listItems.length > 0 &&
              this.state.listItems.map(item => (
                <ListItem
                  key={item._id}
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
