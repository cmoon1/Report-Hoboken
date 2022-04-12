import React from "react";
import { Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
function Landing() {
	const LinkBehavior = React.forwardRef((props, ref) => (
		<RouterLink ref={ref} to="/report" {...props} role={undefined} />
	));

	return (
		<div>
			<h1>Welcome to Report Hoboken!</h1>
			<Typography variant="h5" component="h2">
				If you would like to report an issue in your location, please press the
				button below.
			</Typography>
			<br />
			<Button variant="contained" component={LinkBehavior}>
				Make a Report
			</Button>
		</div>
	);
}

export default Landing;
