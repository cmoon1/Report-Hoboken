import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Grid, Tabs, Tab } from "@mui/material";
import { useLocation } from "react-router-dom";

const Navigation = () => {
	const location = useLocation();
	const [value, setValue] = useState(0);

	useEffect(() => {
		const paths = ["/", "/report"];
		setValue(
			paths.indexOf(location.pathname.toLowerCase()) >= 0
				? paths.indexOf(location.pathname.toLowerCase())
				: 0
		);
	}, [location.pathname]);

	return (
		<div
			sx={{
				backgroundColor: "white",
				minHeight: "10vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				fontSize: "calc(10px + 2vmin)",
				padding: "20px",
			}}
		>
			<AppBar
				style={{ backgroundColor: "white", color: "black" }}
				sx={{
					backgroundColor: "white",
					minHeight: "10vh",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<Toolbar>
					<Grid container>
						<Grid
							xs={1}
							item
							style={{ textAlign: "left", transform: "translateY(25%)" }}
						>
							<span>Report Hoboken</span>
						</Grid>
						<Grid xs={5} item>
							<Tabs
								aria-label="Navigation Tabs"
								onChange={(e, v) => setValue(v)}
								value={value}
							>
								<Tab label={"Landing"} component={Link} to="/" />
								<Tab label={"Report an Issue"} component={Link} to="/report" />
							</Tabs>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</div>
	);
};

export default Navigation;
