import React, { Component } from "react";

export default class AddContact extends Component {
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
  }
  state = {
    name: "",
    email: "",
    phone: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    console.log("contact");
    const contact = {
      name: this.nameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value
    };

    console.log(contact);
  };

  static defaultProps = {
    name: "Frad Smith",
    email: "fred@yahoo.com",
    phone: "777-7777-777"
  };

  render() {
    const { name, email, phone } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name..."
                className="form-control form-control-lg"
                defaultValue={name}
                onChange={this.onChange}
                ref={this.nameInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email..."
                className="form-control form-control-lg"
                defaultValue={email}
                onChange={this.onChange}
                ref={this.emailInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">phone</label>
              <input
                type="phone"
                name="phone"
                placeholder="Enter Phone..."
                className="form-control form-control-lg"
                defaultValue={phone}
                onChange={this.onChange}
                ref={this.phoneInput}
              />
            </div>
            <input
              type="submit"
              value="Add Contact"
              className="btn btn-block btn-secondary"
            />
          </form>
        </div>
        <h1>Add Contact</h1>
      </div>
    );
  }
}
