import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './components/HomePage';
import BucketList from './components/BucketList';
import TaskGroup from './components/TaskGroup';
import Navbar from './components/Navbar';
import LoginForm from "./components/LoginForm";
import Forgot from "./components/Forgot";
import RegisterForm from "./components/RegisterForm";
import ActivityPage from "./components/ActivityPage";
import FriendsList from "./components/FriendsList";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Contact from "./components/Contact";
import Logout from './components/logout';
import NotFound from "./components/notFound";
import ProtectedRoute from "./components/common/protectedRoute";
import { getCurrentUser } from "./services/authService";
import Reset from './components/Reset';

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
            <Route path="/home" component={HomePage} />
            <ProtectedRoute
              path="/bucketList"
              render={(props) => <BucketList user={this.state.user} {...props} /> }
            />
            <Route path="/taskgroup/:task_id" component={TaskGroup} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/Forgot" component={Forgot} />
            <Route path="/Reset/:token" component={Reset} />
            <Route path="/activityPage" component={ActivityPage} />
            <Route path="/friends" component={FriendsList} />
            <Route path="/messages" component={Messages} />
            <Route path="/myProfile" render={(props) => <Profile user={this.state.user} /> } />
            <Route path="/settings" component={Settings} />
            <Route path="/contact" component={Contact} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
