import React, { Component } from "react";
import ListItem from "./ListItem";
import Downshift from "downshift";
import SearchResults from 'react-filter-search';
import { Dropdown } from 'react-bootstrap';
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
      searchCurrent: '',
      searchResults: [],
      loading: "",
      listFilterSearch: '',
      listFilterItems: [],
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
    if (document.getElementById("new_task").value.length < 5) {
      return;
    }

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
    const user = getCurrentUser();
    const jwt = localStorage.getItem("token");

    const response = updateTask(user, item, newText, jwt);
    response.then(result => {
      const updatedList = result.data;
      this.setState({ listItems: updatedList });
    });
  };

  handleDelete = async item => {
    if (this.confirmDelete(item)) {
      const originalList = this.state.listItems;
      const modifiedList = [...this.state.listItems];
      const index = modifiedList.indexOf(item);
      modifiedList.splice(index, 1);
      this.setState({ listItems: modifiedList });

      try {
        const user = getCurrentUser();
        const jwt = localStorage.getItem("token");

        const response = await removeTask(user, item, jwt);
        //const listItems = response.data;
      } catch (ex) {
        alert('Unable to delete item.');
        this.setState({ listItems: originalList });
      }
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

  // onChange function for Add New Task input
  onChange = e => {
    if (!e) {
      return;
    }
    var searchInput = e.target.value;
    this.setState({searchInput: searchInput});
    searchInput = searchInput.toLowerCase(); // Lowercase for uniform search
    if (searchInput.length > 0) {
      const response = getLikeTasks(searchInput); // Query from
      response.then(
        function(results) {
          this.setState({ searchResults: results.data });
        }.bind(this)
      );
    }
  };

  // onChange function for user list filter search.
  onFilterSearch = e => {
    var searchInput = e.target.value;
    if (searchInput.length > 0) {
      this.setState({listFilterSearch: searchInput})
    } else {
      this.setState({listFilterSearch: ''})
    }

  }

  async filterSort(value) {
    console.log("Sorting started...");
    switch(value) {
      case 0: // Alphabetical sort (ascending)
        var sortedArray = this.state.listItems;
        sortedArray.sort(function (a, b) {
                    var textA = a.taskName.toUpperCase();
                    var textB = b.taskName.toUpperCase();

                    return textA.localeCompare(textB);
                  });
        this.setState({listItems: sortedArray});
        return;
      case 1: // Alphabetical sort (descending)
        var sortedArray = this.state.listItems;
        sortedArray.sort(function (a, b) {
                    var textA = a.taskName.toUpperCase();
                    var textB = b.taskName.toUpperCase();

                    return textB.localeCompare(textA);
                  });
        this.setState({listItems: sortedArray});
        return;
      case 2:
        // get bucket list items
        const user = getCurrentUser();
        const jwt = localStorage.getItem("token");

        // need to pass request headers
        const response = await getListItems(user, jwt);
        const listItems = response.data[0].listItems;
        this.setState({ listItems: listItems });
      default:
        console.log("Sorting: invalid");
        return;
    }
  }

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
                onOuterClick={() => (document.getElementById("new_task").value = this.state.searchInput)}
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
          <ul id="bucket-list-items">
            <div className="row container-list-filter">
              {/* Search bar to filter user's list items. */}
              <input    onChange={this.onFilterSearch}
                        type="text"
                        placeholder="Search for an item on your list..."
                        id="filter_list"
                        name="filter_list"
                        autoComplete="off"
                        className="list-filter col-7 offset-2"
                        aria-describedby="inputGroup-sizing-default"
                />

                {/* Drop down for filter type */}
                <Dropdown className="col-2">
                  <Dropdown.Toggle className="btn btn-info" variant="success" id="dropdown-basic">
                    Filter by..
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => { this.filterSort(0) }}>Alphabetical (ascending)</Dropdown.Item>
                    <Dropdown.Item onClick={() => { this.filterSort(1) }}>Alphabetical (descending)</Dropdown.Item>
                    <Dropdown.Item onClick={() => { this.filterSort(2) }}>Default (newest first)</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <SearchResults
                value={this.state.listFilterSearch}
                data={this.state.listItems}
                renderResults={results => (
                  <div>
                    {results.length > 0 &&
                      results.map(item => (
                        <ListItem
                          key={item._id}
                          task={item}
                          onDelete={this.handleDelete}
                          onComplete={this.handleCompleted}
                          onUpdate={this.handleUpdate}
                        />
                      ))}
                    {results.length < 1 &&
                      <p>Sorry, nothing was found. Try a different search term.</p>
                    }
                  </div>
                )}
              />
          </ul>
        </div>
      </div>
    );
  }
}

export default BucketList;
