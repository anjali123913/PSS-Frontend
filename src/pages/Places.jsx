import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import axios from "axios";
// A simple modal component to show the OpenStreetMap
function MapModal({ isOpen, closeModal, lat, lon }) {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-1/2">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
          >
            X
          </button>
          <div className="h-96 w-full">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                lon - 0.01
              }%2C${lat - 0.01}%2C${lon + 0.01}%2C${lat + 0.01}&layer=mapnik`}
              style={{ border: "0", width: "100%", height: "100%" }}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    )
  );
}

export default function Places() {
  const [places, setPlaces] = useState();

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState({ lat: 0, lon: 0 });

  const openMapModal = (lat, lon) => {
    setMapCoordinates({ lat, lon });
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
                    onClick={() => openMapModal(place.coordinates.lat, place.coordinates.lng )}
                    className="text-blue-500 hover:underline"
                  >
                    View Map
                  </button>
                  <Link
                    to={`/edit-place/${place.id}`}
                    className="text-green-500 hover:underline"
                  >
                    Edit
                  </Link>
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
        lat={mapCoordinates.lat}
        lon={mapCoordinates.lon}
      />
    </div>
  );
}
