import Joi from "joi-browser";
import React, {
	Component
} from "react";
import {
	Redirect
} from 'react-router-dom';
import ActivityFeed from "./ActivityFeed";
import {
	getCurrentUser
} from "../services/authService";
import {
	getListItems,
	getListItem,
	findOrCreateTask,
	getTaskUsers
} from "../services/bucketListService";
import {
	getPublicuser
} from "../services/userService";
import PostForm from './postForm';


class TaskGroup extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      task_id: this.props.match.params.task_id,
	      task_name: '',
	      user_hastask: false,
	      message: '',
	      members: [],
				currentUser: ''
	    };
	}

	async componentDidMount() {
		// User authentication
    const user = getCurrentUser();
    const jwt = localStorage.getItem("token");

		// Get task name
		const response = await getListItem(this.state.task_id);
    this.setState({task_name: response.data.taskName, currentUser: user })

    // Find if user has task
    const tasksresponse = await getListItems(user, jwt);
    const listItems = tasksresponse.data[0].listItems;

    if (this.contains(listItems, "_id", this.state.task_id) ) {
    	this.setState({user_hastask: true});
    }

    // Call function to retrieve members
    this.getMembers();
	}

  	async getMembers() {
  		// Get members with this task in bucketlist
			const membersresponse = await getTaskUsers(this.state.task_id);
	    const members = [];
	    for (var i = 0; i < membersresponse.data.length; i++) {
	    	var member = membersresponse.data[i];
	    	const response = await getPublicuser(member.owner);
	    	//console.log(response.data[0]);
	    	members.push(response.data[0]);
	    }
	    this.setState({members: members});
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
		const { currentUser, task_name, task_id, user_hastask, message } = this.state;

		return (
			<React.Fragment>
				<div className="jumbotron task-group-jumbotron ">
					<h1 className="shadow-text bold-text">{`"${task_name}" Group`}</h1>
					{/* TODO: Add user count */}
					{!user_hastask &&
						<btn className="btn btn-warning" onClick={this.addTask}>Add to my Bucket List!</btn>}
						<h3 className="shadow-text">{`${message}`}</h3>
				</div>
					<div className="row">
						<div className="col-md-8 col-sm-9 col-lg-9 col-xl-10 nopadding">
							<div className="task-group-body task-group-feed">
								<ActivityFeed taskId={task_id} currentUser={currentUser}/>
							</div>
						</div>
						<div className="col-md-4 col-sm-3 col-lg-3 col-xl-2 nopadding">
							<div className="task-group-members-nav">
								<h3>Members</h3>
								<div className="task-group-members-list">
									{this.state.members.map(function(item, i){
									  return <div className="task-group-members-list-item">{`${item.name}`}</div>
									})}
								</div>
							</div>
						</div>
					</div>
			</React.Fragment>
		);
	}

}

export default TaskGroup;
