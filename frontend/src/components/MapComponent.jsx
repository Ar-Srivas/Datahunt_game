import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useState, useRef } from "react";
import { Icon } from "leaflet";

const center = [12.9716, 77.5946]; // Default center (Bangalore)

const customIcon = new Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Component to handle map clicks and add markers
function AddMarkerOnClick({ addMarker }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      addMarker([lat, lng]);
    },
  });
  return null;
}

const MapComponent = ({ onSolve }) => {
    const [markers, setMarkers] = useState([]);
    const [searchLat, setSearchLat] = useState("");
    const [searchLng, setSearchLng] = useState("");
    const [showMap, setShowMap] = useState(false);
    const mapRef = useRef(null);
    
    // Check if the markers form a solution pattern
    const isSolution = () => {
        return markers.length >= 5; // Example condition: at least 5 markers needed
    };

    // Add marker function for map clicks
    const addMarker = (position) => {
        setMarkers((prev) => [...prev, position]);
    };

    // Add marker from search coordinates
    const addSearchMarker = () => {
        const lat = parseFloat(searchLat);
        const lng = parseFloat(searchLng);
        
        if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            alert("Please enter valid coordinates (Latitude: -90 to 90, Longitude: -180 to 180)");
            return;
        }
        
        addMarker([lat, lng]);
        
        // Center map on the new marker
        if (mapRef.current) {
            mapRef.current.setView([lat, lng], 10);
        }
        
        // Clear search fields
        setSearchLat("");
        setSearchLng("");
    };

    // Remove marker function
    const removeMarker = (index) => {
        setMarkers((prev) => prev.filter((_, i) => i !== index));
    };

    // Clear all markers
    const clearMarkers = () => {
        setMarkers([]);
    };

    // Check if the current markers form a solution
    const checkSolution = () => {
        if (isSolution()) {
            onSolve();
        } else {
            alert("Not yet correct! Keep trying.");
        }
    };

    return (
        <div className="relative">
            {/* Toggle button for map */}
            <button 
                onClick={() => setShowMap(!showMap)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
                {showMap ? "Hide Map" : "Open Map"}
            </button>
            
            {/* Map modal overlay */}
            {showMap && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h2 className="text-xl font-bold">Interactive Map</h2>
                            <button 
                                onClick={() => setShowMap(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="p-4 space-y-4 flex-grow overflow-auto">
                            <div className="grid grid-cols-1 gap-3 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Search by Coordinates
                                    </label>
                                    <div className="flex flex-wrap md:flex-nowrap gap-2">
                                        <div className="w-full md:w-2/5">
                                            <input
                                                type="text"
                                                placeholder="Latitude"
                                                value={searchLat}
                                                onChange={(e) => setSearchLat(e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
                                            />
                                        </div>
                                        <div className="w-full md:w-2/5">
                                            <input
                                                type="text"
                                                placeholder="Longitude"
                                                value={searchLng}
                                                onChange={(e) => setSearchLng(e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
                                            />
                                        </div>
                                        <div className="w-full md:w-1/5">
                                            <button
                                                onClick={addSearchMarker}
                                                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end">
                                    <button
                                        onClick={clearMarkers}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Clear All Markers
                                    </button>
                                </div>
                            </div>
                            
                            <div className="relative h-96">
                                <MapContainer 
                                    center={center} 
                                    zoom={5} 
                                    style={{ height: "100%", width: "100%" }} 
                                    className="border-2 border-gray-300 rounded-lg shadow-md"
                                    whenCreated={(map) => {
                                        mapRef.current = map;
                                    }}
                                >
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    {markers.map((position, index) => (
                                        <Marker key={index} position={position} icon={customIcon}>
                                            <Popup>
                                                <div>
                                                    <div className="mb-1">
                                                        Lat: {position[0].toFixed(6)}<br />
                                                        Lng: {position[1].toFixed(6)}
                                                    </div>
                                                    <button 
                                                        onClick={() => removeMarker(index)} 
                                                        className="text-red-500 hover:text-red-700 text-sm"
                                                    >
                                                        Remove Marker
                                                    </button>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    ))}
                                    <AddMarkerOnClick addMarker={addMarker} />
                                </MapContainer>
                                
                                <div className="absolute top-2 right-2 bg-white p-2 rounded shadow-md">
                                    <span className="text-sm font-medium">Markers: {markers.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapComponent;