import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

import { getMessage } from "./service";
import logo from "./logo.svg";

export class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = { message: "Loading..." };

  componentDidMount() {
    getMessage().then((message) => this.setState({ message }));
  }

  render() {
    const { classes } = this.props;
    const { message } = this.state;
    return (
      <main role="main">
        <div>
          <img className={classes.logo} data-qa="logo" src={logo} alt="Just the React logo" />
          <h1 className={classes.message} data-qa="message">{message}</h1>
        </div>
      </main>
    );
  }
}

const styles = (theme) => ({
  message: {
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: "yellow",
    },
  },
  logo: {
    width: 100,
  },
});

export default withStyles(styles)(App);
