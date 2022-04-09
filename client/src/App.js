import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import ReportForm from "./Components/ReportForm";
import Navigation from "./Components/Navigation";
function App() {
	return (
		<Router>
			<div className="App">
				<Navigation />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/report" element={<ReportForm />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
