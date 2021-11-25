import React, { Component } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Components/Login/LoginComponent";
import SignUp from "./Components/Signup/SignupComponent";
import Bookings from "./Components/Flights/Bookings";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        {/* added temporarily for home*/}
        <Router>
          <Routes> 
        <Route path="/" component= {SignUp}/>
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/bookings" exact element={Bookings} />
        </Routes>
        </Router>
      </div>
    );
  }
}
//Export The Main Component
export default Main;