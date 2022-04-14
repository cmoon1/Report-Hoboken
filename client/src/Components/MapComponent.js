import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import {
	Typography,
	List,
	ListItem,
	ListItemText,
	Divider,
	ListItemButton,
	Pagination,
} from "@mui/material";
function MapComponent() {
	const [center, setCenter] = useState({ lat: 40.744, lng: -74.0324 });
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(3);
	const [activeMarker, setActiveMarker] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(null);
	// sample data for now
	const [issuesData, setIssuesData] = useState([
		{
			title: "Water issue",
			location: "Reported at 123 Road",
			coords: { lat: 40.744, lng: -74.0324 },
			name: "Bobby Jones",
		},
		{
			title: "Power issue",
			location: "Reported at 1000 Ave",
			coords: { lat: 40.744838, lng: -74.025683 },
			name: "Billy Bob",
		},
		{
			title: "Air Quality",
			location: "Reported at 100 Ave",
			coords: { lat: 40.7445, lng: -74.0324 },
			name: "Chris Moon",
		},
		{
			title: "Potholes",
			location: "Reported at 235 Road",
			coords: { lat: 40.7442, lng: -74.026 },
			name: "David Smith",
		},
		{
			title: "Power issue",
			location: "Reported at somewhere",
			coords: { lat: 40.746, lng: -74.03 },
			name: "John Smith",
		},
		{
			title: "Noise issue",
			location: "Reported at Stevens",
			coords: { lat: 40.7433, lng: -74.0266 },
			name: "Anonymous",
		},
		{
			title: "Construction",
			location: "Reported at 1 Ave",
			coords: { lat: 40.742, lng: -74.031 },
			name: "Bobby Jones",
		},
		{
			title: "Police Activity",
			location: "Reported at 101 Street",
			coords: { lat: 40.745, lng: -74.026 },
			name: "Billy Bob",
		},
		{
			title: "Power issue",
			location: "Reported at 1000 Ave",
			coords: { lat: 40.75, lng: -74.028 },
			name: "Billy Jones",
		},
	]);
	let issuesList = [];

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
		setActiveMarker(index);
		setCenter(issuesData[index].coords);
	};

	const handlePageChange = (e, value) => {
		setCurrentPage(value);
	};

	const handleToggleOpen = (markerId) => {
		setActiveMarker(markerId);
	};

	const handleToggleClose = () => {
		setActiveMarker(null);
	};

	const buildCards = (issue, index) => {
		return (
			<div key={index}>
				<ListItem alignItems="flex-start">
					<ListItemButton
						selected={selectedIndex === index}
						onClick={(event) => handleListItemClick(event, index)}
					>
						<ListItemText
							primary={issue.title}
							secondary={
								<React.Fragment>
									<Typography
										sx={{ display: "inline" }}
										component="span"
										variant="body2"
										color="text.primary"
									>
										{issue.name}
									</Typography>
									{" - " + issue.location}
								</React.Fragment>
							}
						/>
					</ListItemButton>
				</ListItem>
				<Divider variant="insert" component="li" />
			</div>
		);
	};

	issuesList =
		issuesData &&
		issuesData
			.slice((currentPage - 1) * 3, currentPage * 3)
			.map((issue, index) => {
				return buildCards(issue, index);
			});

	return (
		<div style={{ display: "flex" }}>
			<GoogleMap
				zoom={15}
				center={center}
				mapContainerClassName="map-container"
			>
				{issuesData &&
					issuesData
						.slice((currentPage - 1) * 3, currentPage * 3)
						.map((issue, index) => {
							return (
								<div key={index}>
									<Marker
										title={issue.title}
										position={{ lat: issue.coords.lat, lng: issue.coords.lng }}
										onClick={() => handleToggleOpen(index)}
										animation={window.google.maps.Animation.DROP}
									/>
									{activeMarker === index ? (
										<InfoWindow
											key={index + issue.title}
											onCloseClick={handleToggleClose}
											position={{
												lat: issue.coords.lat,
												lng: issue.coords.lng,
											}}
										>
											<div>
												<h2>{issue.title}</h2>
												<br />
												<p>{issue.location}</p>
											</div>
										</InfoWindow>
									) : null}
								</div>
							);
						})}
			</GoogleMap>
			{/* <div className="map-container"></div> */}

			<div className="issue-container">
				<h1 style={{ textAlign: "center", justifyContent: "center" }}>
					Current Issues
				</h1>
				<List sx={{ width: "100%", bgcolor: "background.paper" }}>
					<Divider variant="insert" component="li" />
					{issuesList}
				</List>
				<Pagination
					count={totalPages}
					page={currentPage}
					onChange={handlePageChange}
					defaultPage={1}
					color="primary"
					size="large"
					showFirstButton
					showLastButton
				/>
			</div>
		</div>
	);
}

export default MapComponent;
