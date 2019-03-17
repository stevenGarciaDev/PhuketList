import React, { 
	Component 
} from "react";
import { 
	getCurrentUser 
} from "../services/authService";
import {
  getListItem
} from "../services/bucketListService";

class TaskGroup extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      task_id: this.props.match.params.task_id,
	      task_name: '',
	    };
	}

	async componentDidMount() {
	    const response = await getListItem(this.state.task_id);
	    this.setState({task_name: response.data.taskName})
  	}

	render() {
		return (
			<div>
				<p>{`Group Page Task ID: ${this.state.task_id}`}</p>
				<p>{`Group Page Task Name: ${this.state.task_name}`}</p>
			</div>
		);
	}

}

export default TaskGroup;