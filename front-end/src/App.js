import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import MyBucketList from './pages/MyBucketList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route path="/MyBucketList" component={MyBucketList} />

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
