import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/LoginComponent";
import SignUp from "./Signup/SignupComponent";
import SearchFlights from "./SearchFlights/SearchFlights";
import CreateReservation from "./Home/CreateReservation/CreateReservation";
import Bookings from "./Flights/Bookings";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        {/* added temporarily for home*/}
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/flights" element={<SearchFlights />} />
          <Route path="/createReservation" element={<CreateReservation />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </div>
    );
  }
}
//Export The Main Component
export default Main;
