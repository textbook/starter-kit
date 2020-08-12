import React from "react";
import { Route, Switch } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";

const App = () => (
	<Switch>
		<Route path="/" exact component={Home} />
		<Route path="/about" component={About} />
	</Switch>
);

export default App;
