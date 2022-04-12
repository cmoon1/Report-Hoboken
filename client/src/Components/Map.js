import React from "react";
import MapComponent from "./MapComponent";
import { useLoadScript } from "@react-google-maps/api";

const Map = () => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

	if (!isLoaded) return <div>Loading...</div>;

	return <MapComponent />;
};

export default Map;
