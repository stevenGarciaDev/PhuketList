import React, { Component } from "react";

class HomePage extends Component {
	constructor(props) {
	    super(props);
		this.state = {};
		
	}

	render() {
		return(
			<React.Fragment>
				<div className="home-container">
					<div className="home-title-container">
						<h1 className="home-title">Phuket List</h1>
						<p className="home-subtitle">A social network that connects people to check off items on their bucket list.</p>
					</div>

					<div className="home-center">
						<div>
							<btn className="btn btn-warning">Sign in!</btn>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default HomePage;