import Joi from "joi-browser";
import React, { 
	Component 
} from "react";
import ActivityFeed from "./ActivityFeed"
import { 
	getCurrentUser 
} from "../services/authService";
import {
  getListItem
} from "../services/bucketListService";
import { Redirect } from 'react-router-dom';

class TaskGroup extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      task_id: this.props.match.params.task_id,
	      task_name: '',
	      user_hastask: false,
	      user_ismember: false,
	    };
	}

	async componentDidMount() {
		// Get task name
	    const response = await getListItem(this.state.task_id);
	    this.setState({task_name: response.data.taskName})
  		
  		// Identify if user has bucket task

  		// Identify if user is part of group
  	}

  	renderRedirect = () => {
	    if (this.state.task_name === '') {
			return <Redirect to='/not-found' />
		}
	}

	render() {
		return (
			<React.Fragment>
				<div className="jumbotron task-group-jumbotron"> </div>
					<div className="task-group-jumbotron-container" >
							<h1 className="shadow-text">{`"${this.state.task_name}"`}</h1>
							<h3 className="shadow-text">Group page</h3>
							<btn className="btn btn-info">Join Group</btn>
							<btn className="btn btn-warning">Add to my Bucket List!</btn>
					</div>
					<div className="task-group-body task-group-feed">
						<ActivityFeed/>
					</div>
			</React.Fragment>
		);
	}

}

export default TaskGroup;