import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Simulated data for places (you can replace this with API data)
const placesData = [
  {
    id: 1,
    title: "Central Park",
    description: "A large public park in New York City.",
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
];

export default function EditPlace() {
  const { id } = useParams(); // Get the place ID from the URL
  const navigate = useNavigate(); // To navigate after editing

  // Find the place that matches the ID from the simulated data
  const place = placesData.find((place) => place.id === parseInt(id));

  const [title, setTitle] = useState(place?.title || "");
  const [description, setDescription] = useState(place?.description || "");
  const [image, setImage] = useState(place?.image || "");
  const [address, setAddress] = useState(place?.address || "");
  const [lat, setLat] = useState(place?.lat || "");
  const [lon, setLon] = useState(place?.lon || "");

  useEffect(() => {
    if (!place) {
      navigate("/404"); // Redirect to a 404 page if the place doesn't exist
    }
  }, [place, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission to update the place
    const updatedPlace = {
      id: place.id,
      title,
      description,
      image,
      address,
      lat,
      lon,
    };

    // Normally here you'd make an API call to update the place on the backend
    console.log("Updated place:", updatedPlace);

    // Redirect after successful update (or show a success message)
    navigate(`/places`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Place</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              id="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="lat" className="block text-sm font-medium text-gray-700">Latitude</label>
              <input
                id="lat"
                type="number"
                step="any"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lon" className="block text-sm font-medium text-gray-700">Longitude</label>
              <input
                id="lon"
                type="number"
                step="any"
                value={lon}
                onChange={(e) => setLon(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
