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
	ListItemAvatar,
	Avatar,
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

	const pictures = {
		nowater: "/imgs/nowater.jpg",
		nopower: "/imgs/nopower.jpg",
		flooding: "/imgs/flooding.png",
		construction: "/imgs/construction.jpg",
		noise: "/imgs/noise.png",
		airquality: "/imgs/airquality.jpg",
		potholes: "/imgs/potholes.jpg",
	};

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				const { data } = await axios.get("/report");
				setIssuesData(data);
				// console.log(data);
				let pages = Math.ceil(Number(data.length) / 3);
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
				let data;
				console.log(filterIssue);
				if (filterIssue === "none") {
					data = issuesData;
				} else {
					data = issuesData.filter((x) => x.issueType === filterIssue);
				}
				console.log(data);
				// let data = issuesData.filter((x) => x.issueType === filterIssue);
				setFilteredIssues(data);
				let pages = Math.ceil(Number(data.length) / 3);
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
					<ListItemAvatar>
						<Avatar alt="nowater" src={pictures[issue.issueType]} />
					</ListItemAvatar>
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
										Reported by {issue.name} on {issue.date} at {issue.time}
									</Typography>
									<br />
									{issue.address}
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
									<ListItem>
										<ListItemText primary={"No issues have been reported."} />
									</ListItem>
								)}
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
