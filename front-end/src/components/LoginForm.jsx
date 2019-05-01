import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/authService";
import { Link } from "react-router-dom";
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
  };

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
  };

  forgotPage = () => {
    window.location = "/Forgot";
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
              {}
            </form>


        </div>
      </React.Fragment>// <button onClick={ loadClient()}>  Sign In with Gmail  </button>
    );
  }
}

export default LoginForm;
