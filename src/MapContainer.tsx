import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./App.css";

const Map = () => {
  const center = useMemo(() => ({ lat: 34.055371, lng: -84.064106 }), []);
  return (
    <div className="map">
      <LoadScript googleMapsApiKey="AIzaSyBPwgAjsfJCRoR3nGFhZA8YzTzQNC7QUTw">
        <GoogleMap
          mapContainerClassName="map-container"
          zoom={13}
          center={center}
        >
          <Marker
            position={{ lat: 34.055371, lng: -84.064106 }}
            icon={"http://maps.google.com/mapfiles/ms/icons/pink-dot.png"}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
