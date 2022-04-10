import React, { useMemo, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import {
	Typography,
	Grid,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemText,
	Divider,
	ListItemButton,
} from "@mui/material";
function MapComponent() {
	const center = useMemo(() => ({ lat: 40.744, lng: -74.0324 }), []);
	const [selectedElement, setSelectedElement] = useState(null);
	const [activeMarker, setActiveMarker] = useState(null);
	const [showInfoWindow, setInfoWindowFlag] = useState(false);

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
			title: "Power issue",
			location: "Reported at 1000 Ave",
			coords: { lat: 40.7445, lng: -74.0324 },
			name: "Billy Bob",
		},
	]);
	let issuesList = [];
	let markersList = [];

	const handleToggleOpen = (markerId) => {
		setActiveMarker(markerId);
	};

	const handleToggleClose = () => {
		setActiveMarker(null);
	};

	const buildCards = (issue, index) => {
		return (
			<ListItem alignItems="flex-start" key={index}>
				<ListItemButton>
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
		);
	};

	const buildMarkers = (issue, index) => {
		return (
			<Marker
				key={index}
				position={{ lat: issue.coords.lat, lng: issue.coords.lng }}
			/>
		);
	};
	console.log(activeMarker);
	issuesList =
		issuesData &&
		issuesData.map((issue, index) => {
			return buildCards(issue, index);
		});

	markersList =
		issuesData &&
		issuesData.map((issue, index) => {
			return buildMarkers(issue, index);
		});

	return (
		<div style={{ display: "flex" }}>
			<GoogleMap
				zoom={15}
				center={center}
				mapContainerClassName="map-container"
				// onLoad={(map) => {
				// 	for (let i = 0; i < 3; i++) {
				// 		new window.google.maps.Marker({
				// 			position: issuesData[i].coords,
				// 			map,
				// 			title: "Hello!",
				// 		});
				// 	}
				// }}
			>
				{issuesData.map((issue, index) => {
					return (
						<div key={index}>
							<Marker
								title={issue.title}
								position={{ lat: issue.coords.lat, lng: issue.coords.lng }}
								onClick={() => handleToggleOpen(index)}
							/>
							{activeMarker === index ? (
								<InfoWindow
									key={index + issue.title}
									onCloseClick={handleToggleClose}
									position={{ lat: issue.coords.lat, lng: issue.coords.lng }}
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
				{/* <Grid container>{issuesList}</Grid> */}
				<List sx={{ width: "100%", bgcolor: "background.paper" }}>
					{issuesList}
				</List>
			</div>
		</div>
	);
}

export default MapComponent;
