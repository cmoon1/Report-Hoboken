import React from "react";
import MapComponent from "./MapComponent";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const Map = () => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY,
		libraries,
	});

	if (!isLoaded) return <div>Loading...</div>;

	return <MapComponent />;
};

export default Map;
