import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login, authenticateGoogle } from "../services/authService";
import { Link } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';


class LoginForm extends Form {

  constructor(props) {
    super(props);
    this.state = {
      data: { email: "", password: "" },
      errors: {}
    };
  }

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  }

  doSubmit = async () => {
    // Call the server
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.email, data.password);
      localStorage.setItem('token', jwt);
      window.location = "/bucketList";
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = {...this.state.errors};
        errors.username = ex.response.data;  // display error from server
        this.setState({ errors });
      }
    }
  }

  forgotPage = () => {
    window.location = "/Forgot";
  }

  googleSuccess = async (response) => {
    const name = response.profileObj.name;
    const email = response.profileObj.email;
    const password = response.tokenObj.access_token;
    // Call the server
    try {
      const { data } = this.state;
      const { data: jwt } = await authenticateGoogle(name, email, password);
      localStorage.setItem('token', jwt);
      window.location = "/bucketList";
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = {...this.state.errors};
        errors.username = ex.response.data;  // display error from server
        this.setState({ errors });
      }
    }
  }

  googleError = (response) => {
    console.log(response);
  }

  render() {
    return (
      <React.Fragment>


        <div className="jumbotron" id="auth-jumbotron"></div>

        <div className="authenticate-form">
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Login")}
              <Link to="/Forgot">Forgot password?</Link>
            </form>
            <hr />
            <h5>or</h5>
              <GoogleLogin
                clientId="745879377205-gjmkk5rrfnnqtehsae85n23cuuqol4d5.apps.googleusercontent.com"
                render={renderProps => (

                  <button className="button-google" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <img className="button-google-logo" src="https://developers.google.com/identity/images/g-logo.png"/>Sign in with Google
                  </button>
                )}
                buttonText="Login"
                onSuccess={this.googleSuccess}
                onFailure={this.googleError}
                cookiePolicy={'single_host_origin'}
              />
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
