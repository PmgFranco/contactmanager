import React, { Component } from "react";

export default class Test extends Component {
  state = {
    title: "",
    body: ""
  };
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => response.json())
      .then(data => {
        console.log(data);

        this.setState({
          title: data.title,
          body: data.body
        });
      });
  }

  componentWillMount() {
    console.log("componentWillMount...");
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log("componentWillReceiveProps...");
  }

  render() {
    const { title, body } = this.state;

    return (
      <div>
        <h1>{title}</h1>
        <h2>{body}</h2>
      </div>
    );
  }
}
