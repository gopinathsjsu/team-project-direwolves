import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/LoginComponent";
import SignUp from "./Signup/SignupComponent";
import SearchFlights from "./SearchFlights/SearchFlights";
import CreateReservation from "./Home/CreateReservation/CreateReservation";
import Bookings from "./Flights/Bookings";
import ManageMileage from "./MileageAccount/ManageMileage";
import Landing from "./Landing/Landing";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Landing} />
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/flights" component={SearchFlights} />
        <Route path="/createReservation" component={CreateReservation} />
        <Route path="/bookings" component={Bookings} />
        <Route path="/manageProfile" component={ManageMileage} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
