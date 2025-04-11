import { useState } from "react";

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
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.01}%2C${lat - 0.01}%2C${lon + 0.01}%2C${lat + 0.01}&layer=mapnik`}
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

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "John Doe",
    location: "New York, USA",
    profilePicture: "https://via.placeholder.com/150",
    places: [
      {
        id: 1,
        title: "Central Park",
        description: "A large public park in New York City, a great place to relax.",
        image: "https://via.placeholder.com/150",
        address: "New York, NY, USA",
        lat: 40.785091,
        lon: -73.968285,
      },
      {
        id: 2,
        title: "Empire State Building",
        description: "An iconic skyscraper located in Midtown Manhattan.",
        image: "https://via.placeholder.com/150",
        address: "20 W 34th St, New York, NY 10118, USA",
        lat: 40.748817,
        lon: -73.985428,
      },
    ],
  });

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState({ lat: 0, lon: 0 });

  const openMapModal = (lat, lon) => {
    setMapCoordinates({ lat, lon });
    setIsMapOpen(true);
  };

  const closeMapModal = () => {
    setIsMapOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-2xl">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600 mt-2">{user.location}</p>
        </div>

        {/* Places Created by User */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Places Created</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.places.map((place) => (
              <div key={place.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={place.image}
                  alt={place.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800">{place.title}</h4>
                  <p className="text-sm text-gray-600 mt-2">{place.description}</p>
                  <p className="text-sm text-gray-500 mt-2">{place.address}</p>
                  <button
                    onClick={() => openMapModal(place.lat, place.lon)}
                    className="mt-4 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    View Map
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Actions */}
        <div className="mt-6 space-y-4">
          <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Edit Profile
          </button>
          <button className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Logout
          </button>
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
