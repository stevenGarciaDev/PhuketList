import Joi from "joi-browser";
import React, {
	Component
} from "react";
import { 
	Redirect 
} from 'react-router-dom';
import ActivityFeed from "./ActivityFeed"
import {
	getCurrentUser
} from "../services/authService";
import {
	getListItems,
	getListItem,
	findOrCreateTask
} from "../services/bucketListService";
import PostForm from './postForm';


class TaskGroup extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      task_id: this.props.match.params.task_id,
	      task_name: '',
	      user_hastask: false,
	      message: '',
	    };


	}

	async componentDidMount() {
		// User authentication
	    const user = getCurrentUser();
	    const jwt = localStorage.getItem("token");

		// Get task name
		const response = await getListItem(this.state.task_id);
	    this.setState({task_name: response.data.taskName})

	    // Find if user has task
	    const tasksresponse = await getListItems(user, jwt);
	    const listItems = tasksresponse.data[0].listItems;

	    if (this.contains(listItems, "_id", this.state.task_id) ) {
	    	this.setState({user_hastask: true});
	    }
  	}

  	contains = (arr, key, val) => {
	    for (var i = 0; i < arr.length; i++) {
	        if(arr[i][key] === val) return true;
	    }
	    return false;
	}

  	renderRedirect = () => {
	    if (this.state.task_name === '') {
			return (<Redirect to='/not-found' />);
		}
	}

	addTask = () => {
		try {
	      const user = getCurrentUser();
	      const jwt = localStorage.getItem("token");

	      // create a new list item
	      const response = findOrCreateTask(user, this.state.task_name, jwt);
	      response.then(result => {
	        this.setState({user_hastask: true});
	        this.setState({message: 'This is now part of your bucket list!'})
	      });
	    } catch (ex) {
	      alert("Unable to add item.");
	    }
	}

	render() {
		const { task_name, task_id, user_hastask, message } = this.state;

		return (
			<React.Fragment>
				<div className="jumbotron task-group-jumbotron ">
					<h1 className="shadow-text bold-text">{`"${task_name}" Group`}</h1>
					{/* TODO: Add user count */}
					{!user_hastask && 
						<btn className="btn btn-warning" onClick={this.addTask}>Add to my Bucket List!</btn>}
						<h3 className="shadow-text">{`${message}`}</h3>
				</div>
					<div className="task-group-jumbotron-container" >
					</div>
					<div className="task-group-body task-group-feed">
					{user_hastask &&
						<PostForm taskId={task_id}/>}
						<ActivityFeed taskId={task_id}/>
					</div>
			</React.Fragment>
		);
	}

}

export default TaskGroup;
