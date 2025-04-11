import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import SignupPage from "./pages/Signup";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import Places from "./pages/Places";
import EditPlace from "./pages/EditPlace";
import Login from "./pages/Login";
import { AuthContext } from "./context/Authcontext";
import { useState } from "react";
export default function App() {
  const [user,setuser ] = useState({});
  const [tocken,settocken ] = useState({});

  return (
    <Router>
      <AuthContext.Provider value={{settocken,setuser,tocken,user}}>
      <Navbar />
      <Login/>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/user-profile/:id" element={<UserProfile/>} />
          <Route path="/places" element={<Places/>} />
          <Route path="/edit-place/:id" element={<EditPlace/>} />

          <Route path="/register" element={<SignupPage />} />
          <Route path="/" element={<h1 className='text-center text-3xl font-bold'>Welcome to MyApp</h1>} />
        </Routes>
      </div>
      </AuthContext.Provider>/
    </Router>
  );
}
