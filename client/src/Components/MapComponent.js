import React, { useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

function MapComponent() {
	const center = useMemo(() => ({ lat: 40.744, lng: -74.0324 }), []);

	return (
		<GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
			<Marker position={{ lat: 40.744, lng: -74.0324 }} />
		</GoogleMap>
	);
}

export default MapComponent;
