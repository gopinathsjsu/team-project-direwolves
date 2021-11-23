import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/LoginComponent";
import SignUp from "./Components/Signup/SignupComponent";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        {/* added temporarily for home*/}
        <Routes>
        <Route path="/" component= {SignUp}/>
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={Login} />
        </Routes>
      </div>
    );
  }
}
//Export The Main Component
export default Main;