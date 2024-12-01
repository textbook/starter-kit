import { Route, Routes } from "react-router";

import "./App.css";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/nested/about/path" element={<About />} />
		</Routes>
	);
}

export default App;
