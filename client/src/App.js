import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

import { getMessage } from "./service";

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
      <div data-qa="message" className={classes.message}>{message}</div>
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
});

export default withStyles(styles)(App);
