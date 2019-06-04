import React, { Component } from "react";

import { getMessage } from "./service";

export class App extends Component {
  state = { message: "Loading..." };

  componentDidMount() {
    getMessage().then((message) => this.setState({ message }));
  }

  render() {
    const { message } = this.state;
    return (
      <div data-qa="message">{message}</div>
    );
  }
}

export default App;
