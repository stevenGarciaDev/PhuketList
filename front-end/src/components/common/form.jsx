import React, { Component } from "react";
import Joi from "joi-browser";
import ImageInput from "./imageInput";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    //console.log("error!!", errors);
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleFileChange = async (event) => {
    const imageFile = event.target.files[0];
    const data = { ...this.state.data };
    data['image'] = imageFile;

    this.setState({ data: data });
  }

  renderButton(label, id="", className="") {
    return (
      <button disabled={this.validate()} id={`${id}`} className={`btn btn-primary btn-block ${className}`}>
        {label}
      </button>
    );
  }

  renderFileInput() {
    return (
      <ImageInput
        onChange={this.handleFileChange}
      />
    );
  }

  renderInput(name, label, type = "text", placeholder = "") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        placeholder={placeholder}
      />
    );
  }
}

export default Form;
