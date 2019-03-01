import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import BucketList from './components/BucketList';
import Navbar from './components/Navbar';
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from './components/logout';
import NotFound from "./components/notFound";
import ProtectedRoute from "./components/common/protectedRoute";
import { getCurrentUser } from "./services/authService";


class App extends Component {

  state = {
    user: ''
  };

  componentDidMount() {
    const user = getCurrentUser();
    if (user) this.setState({ user });
  }

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} />
        <div className="content">
          <Switch>
            <ProtectedRoute
              path="/bucketList"
              render={(props) => <BucketList user={this.state.user} {...props} /> }
            />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
