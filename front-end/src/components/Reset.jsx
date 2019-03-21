import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import PropTypes from 'prop-types';
import { resetPassword,updatePassword } from "../services/userService";
class Reset extends Form {

    constructor(props) {
        super(props);
        this.state = {  
          data: {
                  
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
        .label("confirmPassword")
    };
    async componentDidMount() {
        const response = await resetPassword({params: {
            resetPasswordToken: this.props.match.params.token,
          },
        })
          if(response.data.message === 'password reset link a-ok'){
              const email = response.data.email;
              this.setState({email})
          }
          else{
            console.log(response);
          }

        }
        doSubmit = async () => {
            // Call the server
            try {
              const { data } = this.state;
              if(this.state.data.Password === this.state.data.confirmPassword){
                const response = await updatePassword({params: {email: this.state.email,
                                                            Password: data.Password},});
                if(response.data === "Password changed"){
                    alert("Password changed");
                    window.location = "/login";
                }
                else{
                    alert("User not found");
                }
                
              }
              else{
                  alert("Passwords dont match");
                const errors = {...this.state.errors};
                errors.name = 'ex.response.data'; // get the error from the server
                this.setState({ errors });
              }
              
              
              
            }
            catch (ex) {
                
              if (ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors};
                errors.name = ex.response.data; // get the error from the server
                this.setState({ errors });
              }
            }
          };
    
    render() {
        return (
          <React.Fragment>
            <div className="jumbotron" id="auth-jumbotron"></div>
    
            <div className="authenticate-form">
                <h1>Reset Password</h1>
                <form id = "resetp" onSubmit={this.handleSubmit}>
                {this.renderInput("Password", "Password", "password")}
                {this.renderInput("confirmPassword", "confirmPassword", "password")}
                  {this.renderButton("Reset Password")}
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