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
	const [filteredIssues, setFilteredIssues] = useState(undefined);
	const [loading, setLoading] = useState(false);
	let issuesList = [];
	let markerList = [];

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				const { data } = await axios.get("/report");
				setIssuesData(data);
				console.log(data);
				let pages = Math.floor(Number(data.length) / 3) + 1;
				setTotalPages(pages === 0 ? 1 : pages);

				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				// const { data } = await axios({
				// 	method: "POST",
				// 	url: "/report/filter",
				// 	data: {
				// 		issueType: filterIssue,
				// 	},
				// });
				let data = issuesData.filter((x) => x.issueType === filterIssue);
				console.log(issuesData.filter((x) => x.issueType === filterIssue));
				// setFilteredIssues(
				// 	issuesData.filter((x) => x.issueType === filterIssue)
				// );
				setFilteredIssues(data);
				// console.log(data);
				let pages = Math.floor(Number(data.length) / 3) + 1;
				// let pages = 2;
				console.log(pages);
				setTotalPages(pages === 0 ? 1 : pages);

				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		}
		if (filterIssue) {
			fetchData();
		}
	}, [filterIssue, issuesData]);

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

	if (filterIssue) {
		issuesList =
			filteredIssues &&
			filteredIssues
				.slice((currentPage - 1) * 3, currentPage * 3)
				.map((issue, index) => {
					return buildCards(issue, index);
				});
		markerList =
			filteredIssues &&
			filteredIssues
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
				});
	} else {
		issuesList =
			issuesData &&
			issuesData
				.slice((currentPage - 1) * 3, currentPage * 3)
				.map((issue, index) => {
					return buildCards(issue, index);
				});
		markerList =
			issuesData &&
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
				});
	}

	return (
		<div style={{ margin: "auto" }}>
			{/* <h3 style={{ textAlign: "center", justifyContent: "center" }}>
				Current Issues
			</h3> */}
			<Typography
				style={{
					textAlign: "center",
					justifyContent: "center",
					paddingTop: "10px",
					height: "70px",
				}}
				variant="h4"
				component="h1"
			>
				Current Issues
			</Typography>
			{loading ? (
				<CircularProgress />
			) : (
				<div style={{ display: "flex" }}>
					<GoogleMap
						zoom={15}
						center={center}
						mapContainerClassName="map-container"
					>
						{markerList}
					</GoogleMap>
					<div className="issue-container">
						<Filter
							className="filter-select"
							setFilter={setFilter}
							filteredIssue={filterIssue}
						/>
						<div className="issue-list">
							<List sx={{ width: "100%", bgcolor: "background.paper" }}>
								<Divider variant="insert" component="li" />
								{issuesList && issuesList.length > 0 ? (
									issuesList
								) : (
									<div>No events have been reported</div>
								)}
								{/* {issuesList} */}
							</List>
						</div>
						<div className="pagination-controls">
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
				</div>
			)}
		</div>
	);
}

export default MapComponent;
