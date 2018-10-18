import React, { Component } from "react";
import { Consumer } from "../../Context";
import uuid from "uuid";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

export default class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    error: { name: "", email: "", phone: "" }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  async componentDidMount() {
    //id Comes from the Link's URL
    const { id } = this.props.match.params;

    const url = `https://jsonplaceholder.typicode.com/users/${id}`;

    const res = await axios.get(url);

    const user = res.data;

    this.setState({
      name: user.name,
      email: user.email,
      phone: user.phone
    });
  }
  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    //Check for Form errors
    if (name === "") {
      this.setState({ error: { name: "Name is Required" } });
      return;
    }

    if (email === "") {
      this.setState({ error: { email: "Email is Required" } });
      return;
    }

    if (phone === "") {
      this.setState({ error: { phone: "Phone is Required" } });
      return;
    }

    //Get ID From URL
    const { id } = this.props.match.params;

    const url = `https://jsonplaceholder.typicode.com/users/${id}`;

    const updContact = {
      name,
      email,
      phone
    };

    const resUpdateContact = await axios.put(url, updContact);

    //Add to State
    dispatch({ type: "UPDATE_CONTACT", payload: resUpdateContact.data });

    //Clear Current State
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, error } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    value={name}
                    placeholder="Enter Name"
                    onChange={this.onChange}
                    error={error.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    value={email}
                    placeholder="Enter Email"
                    type="email"
                    onChange={this.onChange}
                    error={error.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    value={phone}
                    placeholder="Enter Phone"
                    type="phone"
                    onChange={this.onChange}
                    error={error.phone}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-block btn-secondary"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
