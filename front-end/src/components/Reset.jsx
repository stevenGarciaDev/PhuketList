import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import PropTypes from 'prop-types';
import { resetPassword } from "../services/userService";
class Reset extends Form {

    constructor(props) {
        super(props);
        this.state = {  
          data: { email: '',
                updated: false,
                Password: "",
                  confirmPassword: ""},
          errors: {}
        };
      }

    schema = {
        Password: Joi.string()
        .required()
        .label("Password"),
        confirmPassword: Joi.string()
        .required()
        .label("ConfirmPassword")
    };
    async componentDidMount() {
        const response = await resetPassword({params: {
            resetPasswordToken: this.props.match.params.token,
          },
        })
        console.log("test");
          if(response.data.message === 'password reset link a-ok'){
              this.setState({
                 email: response.data.email,
                 updated: false, 
              });
          }
          else{
            console.log(response);
            this.setState({
                updated: false,
            })
          }
        }
    /*
    async componentDidMount() {
        await axios
          .get('http://localhost:3000/resetPassword', {
            params: {
              resetPasswordToken: this.props.match.params.token,
            },
          })
          .then(response => {
            console.log(response);
            if (response.data.message === 'password reset link a-ok') {
              this.setState({
                username: response.data.username,
                updated: false,
                isLoading: false,
                error: false,
              });
            }
          })
          .catch(error => {
            console.log(error.response.data);
            this.setState({
              updated: false,
              isLoading: false,
              error: true,
            });
          });
      }
      */
    render() {
        return (
          <React.Fragment>
            <div className="jumbotron" id="auth-jumbotron"></div>
    
            <div className="authenticate-form">
                <h1>Reset Password</h1>
                <form onSubmit={this.handleSubmit}>
                {this.renderInput("Password", "Password", "password")}
                {this.renderInput("confirmPassword", "confirmPassword", "password")}
                  {this.renderButton("Reset")}
                </form>
            </div>
          </React.Fragment>
        );
      }
      
    

}
Reset.PropTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }),
  }),
};
export default Reset;