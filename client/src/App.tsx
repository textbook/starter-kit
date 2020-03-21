import React, { Component, ReactNode } from "react";

import "./App.css";
import { getMessage } from "./service";
import logo from "./logo.svg";

export class App extends Component {
	state = { message: "Loading..." };

	componentDidMount(): void {
		getMessage().then((message) => this.setState({ message }));
	}

	render(): ReactNode {
		const { message } = this.state;
		return (
			<main role="main">
				<div>
					<img className="logo" data-qa="logo" src={logo} alt="Just the React logo" />
					<h1 className="message" data-qa="message">{message}</h1>
				</div>
			</main>
		);
	}
}

export default App;
