import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ms}) => {
    const markers = ms.length
        ? ms.map((l) => (
            <Marker position={[l.latitude, l.longitude]}>
                <Popup>
                    <b>{l.name}</b>
                    <br />
                    Latitude: {l.latitude} <br />
                    Longitude: {l.longitude}
                </Popup>
            </Marker>
        ))
        : null;
    
    return (
        <MapContainer id="map" center={[0, 0]} zoom={0} maxZoom={19}>
        <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        {markers}
        </MapContainer>
    );
};

export default Map;