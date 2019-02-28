import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import jwtDecode from 'jwt-decode';
import { Route, Switch, Redirect } from 'react-router-dom';
import BucketList from './components/BucketList';
import Navbar from './components/Navbar';
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import NotFound from "./components/notFound";

class App extends Component {

  state = { };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      this.setState({ user });
    }
    catch (ex) {
      // can ignore errors,
      // as not an application error
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} />
        <div className="content">
          <Switch>
            <Route
              path="/bucketList"
              render={(props) => <BucketList user={this.state.user} {...props} /> }
            />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
