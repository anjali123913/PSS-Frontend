import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import axios from "axios";
// A simple modal component to show the OpenStreetMap
import { useEffect, useState } from "react";


import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

 function MapModal({ isOpen, closeModal, address }) {
  const [userCoords, setUserCoords] = useState(null);
  const [placeCoords, setPlaceCoords] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchRouteData = async () => {
      if (!isOpen || !address) return;

      setLoading(true);
      try {
        // Get user's current location
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            setUserCoords({ lat: latitude, lng: longitude });

            // Get place coordinates from address
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                address
              )}`
            );

            if (response.data.length > 0) {
              const { lat, lon } = response.data[0];
              setPlaceCoords({ lat, lng: lon });
            } else {
              setPlaceCoords(null);
            }

            setLoading(false);
          },
          (err) => {
            console.error("Geolocation error:", err);
            setLoading(false);
          }
        );
      } catch (error) {
        console.error("Error fetching place coordinates:", error);
        setLoading(false);
      }
    };

    fetchRouteData();
  }, [isOpen, address]);

  useEffect(() => {
    if (!userCoords || !placeCoords) return;

    const map = L.map("map").setView([userCoords.lat, userCoords.lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.Routing.control({
      waypoints: [
        L.latLng(userCoords.lat, userCoords.lng),
        L.latLng(placeCoords.lat, placeCoords.lng),
      ],
      routeWhileDragging: false,
    }).addTo(map);

    return () => {
      map.remove(); // Clean up
    };
  }, [userCoords, placeCoords]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white w-[95%] md:w-[800px] h-[600px] rounded-xl shadow-lg p-4">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full text-sm"
        >
          ✕
        </button>

        {loading ? (
          <p className="text-center mt-40 text-gray-500">Loading map...</p>
        ) : !userCoords || !placeCoords ? (
          <p className="text-center mt-40 text-red-600">
            Could not load route. Try again.
          </p>
        ) : (
          <div id="map" className="w-full h-full rounded-md" />
        )}
      </div>
    </div>
  );
}





export default function Places() {
  const [places, setPlaces] = useState();
const {setPlaceId}=useContext(AuthContext);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState();

  const openMapModal = (address) => {
    setMapCoordinates( address );
    setIsMapOpen(true);
  };

  const closeMapModal = () => {
    setIsMapOpen(false);
  };
  const { token } = useContext(AuthContext);

  const loadPlaces = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/places", {
        headers: {
          Authorization: `Bearer ${token}`, // Replace with actual token
        },
      });
      console.log(response.data);
      setPlaces(response.data);
    } catch (error) {
      console.error("Error loading places:", error);
    }
  };
  useEffect(() => {
    loadPlaces();
  }, []);
  const editPlace =(id)=>{
    setPlaceId(id);
    console.log(id)
    navigate(`/edit-place/${id}`);


  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-2xl">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Places Created by You
        </h2>

        {/* Places List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {places?.map((place) => (
            <div
              key={place.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={place.image}
                alt={place.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                {/* Creator's Profile */}
                <div className="flex items-center gap-4">
                  <img
                    src={place.creator.profilePicture}
                    alt="Creator Profile"
                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {place.creator.name}
                    </h4>
                    <p className="text-sm text-gray-600">{place.address}</p>
                  </div>
                </div>

                {/* Place Details */}
                <h4 className="text-lg font-semibold text-gray-800 mt-4">
                  {place.title}
                </h4>
                <p className="text-sm text-gray-600 mt-2">
                  {place.description}
                </p>

                {/* Actions */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => openMapModal(place.address )}
                    className="text-blue-500 hover:underline"
                  >
                    View Map
                  </button>
                  {/* <Link
                    to={`/edit-place/${place.id}`}
                    className="text-green-500 hover:underline"
                  >
                    Edit
                  </Link> */}
                  <button 
                  className="text-green-500 hover:underline"
                  onClick={() => editPlace(place.id)}>
                    edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Modal */}
      <MapModal
        isOpen={isMapOpen}
        closeModal={closeMapModal}
        address={mapCoordinates}
      />
    </div>
  );
}
