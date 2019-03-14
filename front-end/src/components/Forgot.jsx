import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/authService";

class Forgot extends Form {

    constructor(props) {
        super(props);
        this.state = {
          data: { email: ""},
          errors: {}
        };
      }

    schema = {
    email: Joi.string()
        .required()
        .email()
        .label("Email"),
    };

    render() {
        return (
          <React.Fragment>
            <div className="jumbotron" id="auth-jumbotron"></div>
    
            <div className="Forgot-form">
                <h1>Forgot Password</h1>
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("email", "Email", "email")}
                  {this.renderButton("Send email")}
                </form>
            </div>
          </React.Fragment>
        );
      }
    

}
export default Forgot;