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
import AddPlaceForm from "./AddPlaceForm";
export default function App() {
  const [user,setuser ] = useState({});
  const [placeId,setplaceId ] = useState({});
  const [token,settoken ] = useState({});

  return (
    <Router>
      <AuthContext.Provider value={{settoken,setuser,token,user,placeId,setplaceId}}>
      <Navbar />
      {/* <Login/> */}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/user-profile/:id" element={<UserProfile/>} />
          <Route path="/places" element={<Places/>} />
          <Route path="/edit-place/:id" element={<EditPlace/>} />
          <Route path="/AddPlace" element={<AddPlaceForm/>} />
          <Route path="/places/:id/edit" element={<EditPlace />} />

          <Route path="/register" element={<SignupPage />} />
          {/* <Route path="/" element={<h1 className='text-center text-3xl font-bold'>Welcome to MyApp</h1>} /> */}
        </Routes>
      </div>
      </AuthContext.Provider>/
    </Router>
  );
}
