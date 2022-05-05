import React from "react";
import {
	Modal,
	Button,
	Typography,
	TableContainer,
	Table,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	Box,
} from "@mui/material";
const FormModal = (props) => {
	const issues = {
		nowater: "No Water",
		nopower: "No Power",
		flooding: "Flooding",
		construction: "Construction",
		noise: "Louse Noise",
		airquality: "Bad Air Quality",
		potholes: "Potholes",
	};

	return (
		<Modal open={props.show} onClose={props.onHide}>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 800,
					bgcolor: "background.paper",
					p: 4,
				}}
			>
				<Typography variant="h4" component="h2">
					Confirmation of Report
				</Typography>
				<Typography variant="div">
					Your report has been successfully made on {props.report.date} at{" "}
					{props.report.time}. Here are the details you have provided.
				</Typography>
				<br />
				<br />
				<TableContainer component={Paper} sx={{ border: "2px solid #000" }}>
					<Table aria-label="report-table">
						<TableBody>
							<TableRow key={"name"}>
								<TableCell component="th" scope="row">
									Name
								</TableCell>
								<TableCell align="right">{props.report.name}</TableCell>
							</TableRow>
							<TableRow key={"email"}>
								<TableCell component="th" scope="row">
									Email
								</TableCell>
								<TableCell align="right">{props.report.email}</TableCell>
							</TableRow>
							<TableRow key={"date"}>
								<TableCell component="th" scope="row">
									Date
								</TableCell>
								<TableCell align="right">{props.report.date}</TableCell>
							</TableRow>
							<TableRow key={"address"}>
								<TableCell component="th" scope="row">
									Address
								</TableCell>
								<TableCell align="right">{props.report.address}</TableCell>
							</TableRow>
							<TableRow key={"issueType"}>
								<TableCell component="th" scope="row">
									Type of Issue
								</TableCell>
								<TableCell align="right">
									{issues[props.report.issueType]}
								</TableCell>
							</TableRow>
							<TableRow key={"description"}>
								<TableCell component="th" scope="row">
									Description of the Issue
								</TableCell>
								<TableCell align="right">{props.report.description}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<br />
				<Button onClick={props.onHide} variant="contained">
					Close
				</Button>
			</Box>
		</Modal>
	);
};

export default FormModal;
