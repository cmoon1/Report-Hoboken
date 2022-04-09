import React, { useState } from "react";
import {
	Container,
	Typography,
	Box,
	Grid,
	TextField,
	Button,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	FormHelperText,
	Radio,
	IconButton,
	Collapse,
	Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
function ReportForm() {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		address: "",
		issue: "",
		confirm: false,
	});
	const [nameError, setNameError] = useState(false);
	const [nameErrorMessage, setNameErrorMessage] = useState(" ");
	const [emailError, setEmailError] = useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = useState(" ");
	const [addressError, setAddressError] = useState(false);
	const [addressErrorMessage, setAddressErrorMessage] = useState(" ");
	const [issueError, setIssueError] = useState(false);
	const [issueErrorMessage, setIssueErrorMessage] = useState(" ");
	const [error, setError] = useState(false);
	const [status, setStatus] = useState(false);

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleReport = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(false);
		if (!formData.name || !formData.name.trim()) {
			setNameError(true);
			setNameErrorMessage("Name must be provided");
			setLoading(false);
			return;
		}
		setNameError(false);
		setNameErrorMessage(" ");

		if (!formData.email || !formData.email.trim()) {
			setEmailError(true);
			setEmailErrorMessage("Email must be provided");
			setLoading(false);
			return;
		}
		setEmailError(false);
		setEmailErrorMessage(" ");

		let pattern =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!pattern.test(formData.email)) {
			setEmailError(true);
			setEmailErrorMessage("Email is not valid");
			setLoading(false);
			return;
		}
		setEmailError(false);
		setEmailErrorMessage(" ");

		if (!formData.address || !formData.address.trim()) {
			setAddressError(true);
			setAddressErrorMessage("Address must be provided");
			setLoading(false);
			return;
		}
		setAddressError(false);
		setAddressErrorMessage(" ");

		if (!formData.issue || !formData.issue.trim()) {
			setIssueError(true);
			setIssueErrorMessage(
				"You must select at least one of the issues provided."
			);
			setLoading(false);
			return;
		}
		setIssueError(false);
		setIssueErrorMessage(" ");

		try {
			setStatus(true);
			setLoading(false);
		} catch (error) {
			setError(true);
			setLoading(false);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			{status ? (
				<Collapse in={status}>
					<Alert
						severity="success"
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="smalll"
								onClick={() => {
									setStatus(false);
								}}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
					>
						Your report has been successfully submitted.
					</Alert>
				</Collapse>
			) : (
				<div></div>
			)}
			{error ? (
				<Collapse in={error}>
					<Alert
						severity="error"
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									setError(false);
								}}
							>
								<CloseIcon color="inherit" />
							</IconButton>
						}
					>
						There was a problem with submitting your report. Please try again.
					</Alert>
				</Collapse>
			) : (
				<div></div>
			)}
			<br />
			<Typography component="h1" variant="h5">
				Make a Report
			</Typography>
			<Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleReport}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							name="name"
							required
							fullWidth
							id="name"
							autoFocus
							label="Name"
							error={!!nameError}
							helperText={nameErrorMessage}
							onChange={(e) => handleChange(e)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							name="email"
							required
							fullWidth
							id="email"
							label="Email"
							error={!!emailError}
							helperText={emailErrorMessage}
							onChange={(e) => handleChange(e)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							name="address"
							required
							fullWidth
							id="address"
							label="Address"
							error={!!addressError}
							helperText={addressErrorMessage}
							onChange={(e) => handleChange(e)}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControl component="fieldset" error={issueError}>
							<FormLabel component="p">
								Which of the following describes the issue you are currently
								having?
							</FormLabel>
							<RadioGroup
								row
								name="issue"
								aria-label="issue"
								onChange={(e) => handleChange(e)}
							>
								<FormControlLabel
									control={<Radio />}
									label="No Water"
									value="nowater"
								/>
								<FormControlLabel
									control={<Radio />}
									label="No Power"
									value="nopower"
								/>
								<FormControlLabel
									control={<Radio />}
									label="Flooding"
									value="flooding"
								/>
								<FormControlLabel
									control={<Radio />}
									label="Water Leak"
									value="waterleak"
								/>
								<FormControlLabel
									control={<Radio />}
									label="Noise"
									value="noise"
								/>
								<FormControlLabel
									control={<Radio />}
									label="Air Quality"
									value="airquality"
								/>
							</RadioGroup>
							<FormHelperText sx={{ fontWeight: "bold", fontSize: 14 }}>
								{issueErrorMessage}
							</FormHelperText>
						</FormControl>
					</Grid>

					<Grid item xs={12}>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							disabled={loading}
						>
							Submit
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

export default ReportForm;
