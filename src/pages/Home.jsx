import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to MyApp</h1>
      <p className="text-lg text-gray-600 mb-6">Your one-stop platform for Visite Places and growth.</p>
      <div className="flex space-x-4">
        <Link to="/places" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Explore Places</Link>
        <Link to="/register" className="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white">Get Started</Link>
      </div>
    </div>
  );
}
