import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import {
	Typography,
	List,
	ListItem,
	ListItemText,
	Divider,
	ListItemButton,
	Pagination,
	CircularProgress,
} from "@mui/material";
import Filter from "./Filter";
import axios from "axios";
function MapComponent() {
	const [center, setCenter] = useState({ lat: 40.744, lng: -74.0324 });
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(3);
	const [activeMarker, setActiveMarker] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(null);
	const [filterIssue, setFilterIssue] = useState("");
	const [issuesData, setIssuesData] = useState(undefined);
	const [loading, setLoading] = useState(false);
	let issuesList = [];

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				const { data } = await axios.get("/report");
				setIssuesData(data);
				console.log(data);
				let pages = Math.floor(Number(data.length) / 3);
				setTotalPages(pages === 0 ? 1 : pages);

				setLoading(false);
			} catch (e) {}
		}
		fetchData();
	}, []);

	useEffect(() => {
		function filterResults() {}
		if (filterIssue) {
			filterResults();
		}
	}, [filterIssue]);

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
							primary={issue.description}
							secondary={
								<React.Fragment>
									<Typography
										sx={{ display: "inline" }}
										component="span"
										variant="body2"
										color="text.primary"
									>
										Reported by {issue.name} on {issue.date}
									</Typography>
									{" - " + issue.address}
								</React.Fragment>
							}
						/>
					</ListItemButton>
				</ListItem>
				<Divider variant="insert" component="li" />
			</div>
		);
	};

	const setFilter = async (value) => {
		setFilterIssue(value);
	};

	issuesList =
		issuesData &&
		issuesData
			.slice((currentPage - 1) * 3, currentPage * 3)
			.map((issue, index) => {
				return buildCards(issue, index);
			});

	return (
		<div>
			{loading ? (
				<CircularProgress />
			) : (
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
												title={issue.description}
												position={{
													lat: issue.latitude,
													lng: issue.longitude,
												}}
												onClick={() => handleToggleOpen(index)}
												animation={window.google.maps.Animation.DROP}
											/>
											{activeMarker === index ? (
												<InfoWindow
													key={index + issue.description}
													onCloseClick={handleToggleClose}
													position={{
														lat: issue.latitude,
														lng: issue.longitude,
													}}
												>
													<div>
														<h2>{issue.description}</h2>
														<br />
														<p>{issue.issueType}</p>
													</div>
												</InfoWindow>
											) : null}
										</div>
									);
								})}
					</GoogleMap>
					<div className="issue-container">
						<h1 style={{ textAlign: "center", justifyContent: "center" }}>
							Current Issues
						</h1>
						<Filter setFilter={setFilter} filteredIssue={filterIssue} />
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
			)}
		</div>
	);
}

export default MapComponent;
