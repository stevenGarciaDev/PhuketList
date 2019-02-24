import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';

// Pages
import MyBucketList from './pages/MyBucketList';

// Components
import Navbar from './components/Navbar';
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route path="/MyBucketList" component={MyBucketList} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
