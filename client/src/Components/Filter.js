import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
const Filter = (props) => {
	const handleChange = (event) => {
		props.setFilter(event.target.value);
	};

	return (
		<FormControl fullWidth variant="standard">
			<InputLabel id="filter-label">Filter by Type of Issue</InputLabel>
			<Select
				labelId="filter-label"
				id="filter-select"
				value={props.filteredIssue}
				onChange={handleChange}
			>
				<MenuItem value="">None</MenuItem>
				<MenuItem value="nowater">No Water</MenuItem>
				<MenuItem value="nopower">Power Outage</MenuItem>
				<MenuItem value="flooding">Flooding</MenuItem>
				<MenuItem value="construction">Construction</MenuItem>
				<MenuItem value="noise">Loud Noise</MenuItem>
				<MenuItem value="airquality">Bad Air Quality</MenuItem>
				<MenuItem value="potholes">Potholes</MenuItem>
			</Select>
		</FormControl>
	);
};

export default Filter;
