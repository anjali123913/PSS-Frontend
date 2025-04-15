import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/Authcontext";

export default function EditPlace() {
  const [place, setPlace] = useState({
    title: "",
    description: "",
    address: "",
    image: "", // current image URL
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPlace = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/places/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlace(response.data.place);
      } catch (error) {
        console.error("Error loading place:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlace();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlace((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", place.title);
      formData.append("description", place.description);
      formData.append("address", place.address);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.put(`http://localhost:3000/api/places/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate(`/places/${id}`);
    } catch (error) {
      console.error("Error updating place:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Place</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={place.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-700 font-semibold">Description</label>
            <textarea
              name="description"
              value={place.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="3"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-gray-700 font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={place.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-gray-700 font-semibold">Upload New Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Show Current Image */}
          {place.image && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Current Image:</p>
              <img
                src={place.image}
                alt="Current"
                className="w-48 h-32 object-cover mt-1 rounded-md border"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
