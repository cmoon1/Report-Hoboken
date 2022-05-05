import React, { useState, useMemo, useEffect, useRef } from "react";
import {
	Container,
	Typography,
	Box,
	Grid,
	TextField,
	Button,
	FormControl,
	FormLabel,
	FormHelperText,
	IconButton,
	Collapse,
	Alert,
	Autocomplete,
	Select,
	MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import throttle from "lodash/throttle";
import parse from "autosuggest-highlight/parse";
import axios from "axios";
import FormModal from "./FormModal";
function loadScript(src, position, id) {
	if (!position) {
		return;
	}

	const script = document.createElement("script");
	script.setAttribute("async", "");
	script.setAttribute("id", id);
	script.src = src;
	position.appendChild(script);
}

const autocompleteService = { current: null };

function ReportForm() {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		issueType: "nowater",
		address: "",
		date: new Date().toLocaleDateString("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		}),
		description: "",
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
	const [descriptionError, setDescriptionError] = useState(false);
	const [descriptionErrorMessage, setDescriptionErrorMessage] = useState(" ");
	const [error, setError] = useState(false);

	// Modal states
	const [returnData, setReturnData] = useState(undefined);
	const [showModal, setShowModal] = useState(false);

	// Autocomplete states
	const [value, setValue] = useState(null);
	const [inputValue, setInputValue] = useState("");
	const [options, setOptions] = useState([]);
	const loaded = useRef(false);

	if (
		typeof window !== "undefined" &&
		typeof window.google !== "object" &&
		!loaded.current
	) {
		if (!document.querySelector("#google-maps")) {
			loadScript(
				`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`,
				document.querySelector("head"),
				"google-maps"
			);
		}

		loaded.current = true;
	}

	const fetch = useMemo(
		() =>
			throttle((request, callback) => {
				autocompleteService.current.getPlacePredictions(request, callback);
			}, 200),
		[]
	);

	useEffect(() => {
		let active = true;

		if (!autocompleteService.current && window.google) {
			autocompleteService.current =
				new window.google.maps.places.AutocompleteService();
		}
		if (!autocompleteService.current) {
			return undefined;
			// autocompleteService.current =
			// 	new window.google.maps.places.AutocompleteService();
		}

		if (inputValue === "") {
			setOptions(value ? [value] : []);
			return undefined;
		}

		fetch({ input: inputValue }, (results) => {
			if (active) {
				let newOptions = [];

				if (value) {
					newOptions = [value];
				}

				if (results) {
					newOptions = [...newOptions, ...results];
				}

				setOptions(newOptions);
			}
		});

		return () => {
			active = false;
		};
	}, [value, inputValue, fetch]);

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleCloseModal = () => {
		setShowModal(false);
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

		if (!inputValue || !inputValue.trim()) {
			setAddressError(true);
			setAddressErrorMessage("Address must be provided");
			setLoading(false);
			return;
		}
		setAddressError(false);
		setAddressErrorMessage(" ");

		let hobPattern = /Hoboken/;
		if (
			value &&
			value.structured_formatting &&
			value.structured_formatting.secondary_text &&
			!hobPattern.test(value.structured_formatting.secondary_text)
		) {
			setAddressError(true);
			setAddressErrorMessage("Address must be in Hoboken, NJ");
			setLoading(false);
			return;
		}
		setAddressError(false);
		setAddressErrorMessage(" ");
		// console.log(value);
		// console.log(inputValue);
		if (!formData.issueType || !formData.issueType.trim()) {
			setIssueError(true);
			setIssueErrorMessage("You must select one of the issues provided.");
			setLoading(false);
			return;
		}
		setIssueError(false);
		setIssueErrorMessage(" ");

		if (!formData.description || !formData.description.trim()) {
			setDescriptionError(true);
			setDescriptionErrorMessage("Description must be provided");
			setLoading(false);
			return;
		}
		setDescriptionError(false);
		setDescriptionErrorMessage(" ");

		try {
			const { data } = await axios({
				method: "POST",
				url: "/report",
				data: {
					formData: formData,
					address: inputValue,
				},
			});
			if (!data) {
				throw new Error("Could not make report");
			}
			console.log(data);
			setReturnData(data);
			setShowModal(true);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setError(true);
			setLoading(false);
		}
	};
	return (
		<Container component="main" maxWidth="xs">
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
			{returnData ? (
				<FormModal
					show={showModal}
					onHide={handleCloseModal}
					report={returnData}
				/>
			) : null}

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
							variant="standard"
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
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12}>
						<Autocomplete
							id="google-map"
							getOptionLabel={(option) =>
								typeof option === "string" ? option : option.description
							}
							filterOptions={(x) => x}
							options={options}
							autoComplete
							includeInputInList
							filterSelectedOptions
							value={value}
							onChange={(e, newValue) => {
								setOptions(newValue ? [newValue, ...options] : options);
								setValue(newValue);
							}}
							onInputChange={(e, newInputValue) => {
								setInputValue(newInputValue);
								// setFormData((prev) => ({
								// 	...prev,
								// 	[e.target.name]: e.target.value,
								// }));
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									name="address"
									required
									fullWidth
									id="address"
									label="Address"
									error={!!addressError}
									helperText={addressErrorMessage}
									variant="standard"
								/>
							)}
							renderOption={(props, option) => {
								const matches =
									option.structured_formatting.main_text_matched_substrings;
								const parts = parse(
									option.structured_formatting.main_text,
									matches.map((match) => [
										match.offset,
										match.offset + match.length,
									])
								);

								return (
									<li {...props}>
										<Grid container alignItems="center">
											<Grid item>
												<Box
													component={LocationOnIcon}
													sx={{ color: "text.secondary", mr: 2 }}
												/>
											</Grid>
											<Grid item xs>
												{parts.map((part, index) => (
													<span
														key={index}
														style={{
															fontWeight: part.highlight ? 700 : 400,
														}}
													>
														{part.text}
													</span>
												))}

												<Typography variant="body2" color="text.secondary">
													{option.structured_formatting.secondary_text}
												</Typography>
											</Grid>
										</Grid>
									</li>
								);
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControl component="fieldset" error={issueError}>
							<FormLabel component="p">
								Which of the following describes the issue you are currently
								having?
							</FormLabel>
							<Select
								id="select-label"
								name="issueType"
								value={formData.issueType}
								onChange={(e) => handleChange(e)}
							>
								<MenuItem value="nowater">No Water</MenuItem>
								<MenuItem value="nopower">Power Outage</MenuItem>
								<MenuItem value="flooding">Flooding</MenuItem>
								<MenuItem value="construction">Construction</MenuItem>
								<MenuItem value="noise">Loud Noise</MenuItem>
								<MenuItem value="airquality">Bad Air Quality</MenuItem>
								<MenuItem value="potholes">Potholes</MenuItem>
							</Select>
							<FormHelperText sx={{ fontWeight: "bold", fontSize: 14 }}>
								{issueErrorMessage}
							</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<TextField
							name="description"
							required
							fullWidth
							id="description"
							label="Please Provide a Description of the Issue"
							error={!!descriptionError}
							helperText={descriptionErrorMessage}
							onChange={(e) => handleChange(e)}
							multiline
							rows={1}
							variant="standard"
						/>
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
