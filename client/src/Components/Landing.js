import React from "react";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
function Landing() {
	const LinkBehavior = React.forwardRef((props, ref) => (
		<RouterLink ref={ref} to="/report" {...props} role={undefined} />
	));

	return (
		<div>
			<h1>Welcome to Report Hoboken!</h1>
			<Button variant="contained" component={LinkBehavior}>
				Make a Report
			</Button>
		</div>
	);
}

export default Landing;
