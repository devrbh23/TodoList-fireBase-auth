import React, {Component} from 'react';

import fire from './config/Config';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  login(e) {
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCred) => {
        console.log(userCred);
      })
      .catch((error) => {
        console.log(error);
      });

    e.preventDefault();
  }
  //signup
  signup(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)

      .then((u) => {
        console.log(u);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="container">
        <div className="signUpForm">
          <form className="form">
            <div>
              <p>Email address</p>
              <input
                className="input"
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                name="email"
                placeholder="Enter email"
              />
            </div>
            <div>
              <p className="para">Password</p>
              <input
                className="input"
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
          </form>
          <div className="lsButton">
            <button className="login" type="submit" onClick={this.login}>
              Login
            </button>
            <button className="login" onClick={this.signup}>
              Signup
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
