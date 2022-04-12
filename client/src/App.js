import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import ReportForm from "./Components/ReportForm";
import Navigation from "./Components/Navigation";
import Map from "./Components/Map";

function App() {
	return (
		<Router>
			<div className="App">
				<Navigation />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/report" element={<ReportForm />} />
					<Route path="/map" element={<Map />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
