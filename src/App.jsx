import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import User from "./Componenet/User";
import UserLogin from "./Componenet/UserLogin";
import './index.css';
import './App.css';
import AdminSignup from "./Componenet/AdminSignup";
import AdminLogin from "./Componenet/AdminLogin";
import BookingPage from "./Componenet/BookingPage";
import AddTheaters from "./Componenet/AddTheatesr";
import AdminHome from "./Componenet/AdminHome";
import AddMovies from "./Componenet/AddMovies";
import MovieShow from "./Componenet/MovieShow";
import TheaterHome from "./Componenet/TheaterHome";
import Screen from "./Componenet/Screen";

const App = () => {
  const location = useLocation();

  // Define routes where the navigation should be hidden
  const hideNavRoutes = ["/login", "/signup", "/admin/login", "/admin/signup", "/booking","/add-theaters","/adminhome","/add-movie","/theater-home","/movie-show","/screen"];

  const shouldHideNav = hideNavRoutes.includes(location.pathname);

  return (
    <div className="App">
      {/* Conditionally render the navigation */}
      {!shouldHideNav && (
        <div id="land">
          <h2>Welcome to Ticket Booking App</h2>
          <nav>
            <div className="links">
              <Link className="lin" to="/admin/signup">
                Admin
            </Link>
            </div>
            <div className="links">
            <Link className="lin" to="/usersignup">
                User 
            </Link>
            </div>
          </nav>
        </div>
      )}

      <Routes>
        {/* User Routes */}
        <Route path="/userlogin" element={<UserLogin/>} />
        <Route path="/usersignup" element={<User/>}/>
        <Route path="/booking" element={<BookingPage/>} />
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin/signup" element={<AdminSignup/>} />
        <Route path="/add-theaters" element={<AddTheaters/>} />
        <Route path="/adminhome" element={<AdminHome/>} />
        <Route path="/add-movie" element={<AddMovies/>} />
        <Route path="/screen" element={<Screen/>}/>
        <Route path="/movie-show" element={<MovieShow/>}/>
        <Route path="/theater-home" element={<TheaterHome/>}/>
      </Routes>
    </div>
  );
};

export default App;