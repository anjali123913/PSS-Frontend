import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          MyApp
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
          <Link to="/user-profile/12345" className="text-gray-700 hover:text-blue-500">Profile</Link>
          <Link to="/courses" className="text-gray-700 hover:text-blue-500">Courses</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-500">Contact</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white">Login</button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}