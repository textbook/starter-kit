import { Route, Routes } from "react-router";

import "./App.css";
import About from "./pages/About.tsx";
import Home from "./pages/Home.tsx";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/nested/about/path" element={<About />} />
		</Routes>
	);
}

export default App;
