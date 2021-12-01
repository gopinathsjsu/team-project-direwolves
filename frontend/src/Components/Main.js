import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/LoginComponent";
import SignUp from "./Signup/SignupComponent";
import SearchFlights from "./SearchFlights/SearchFlights";
import CreateReservation from "./Home/CreateReservation/CreateReservation";
import Bookings from "./Flights/Bookings";
import ManageMileage from "./MileageAccount/ManageMileage"

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/flights" element={<SearchFlights />} />
          <Route path="/createReservation" element={<CreateReservation />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/manageProfile" element={<ManageMileage />} />

        </Routes>
      </div>
    );
  }
}
//Export The Main Component
export default Main;
