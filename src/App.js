import React, {Component} from 'react';
import fire from './config/Config';
import Home from './Home';

import './App.css';

import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.authListener = this.authListener.bind(this);
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user});
      } else {
        this.setState({user: null});
      }
    });
  }

  render() {
    return <div className="App">{this.state.user ? <Home /> : <Login />}</div>;
  }
}

export default App;
