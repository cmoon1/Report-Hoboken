import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
const Filter = (props) => {
	const handleChange = (event) => {
		props.setFilter(event.target.value);
	};

	return (
		<FormControl fullWidth>
			<InputLabel id="filter-label">Issues</InputLabel>
			<Select
				labelId="filter-label"
				id="filter-select"
				value={props.filteredIssue}
				label="Issue"
				onChange={handleChange}
			>
				<MenuItem value="flooding">Flooding</MenuItem>
				<MenuItem value="power">Power</MenuItem>
			</Select>
		</FormControl>
	);
};

export default Filter;
