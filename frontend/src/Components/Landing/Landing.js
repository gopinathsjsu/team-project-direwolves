import React, { Component } from "react";
import "./landing.css";
import { Link } from "react-router-dom";

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="landing_img">
        <div className="row">
            <div className="col-sm-9">
                <p style={{fontFamily:"cursive", fontWeight:"50px", paddingLeft:"250px",color:"black"}}>Welcome to Direwolves Airlines</p>
            </div>
            <div className="col-sm-3">
            <Link to="/login" style={{padding:"20px"}}>
                <button className="btn buttonColor ">Login</button>
            </Link>
            <Link to="/register">
                <button className="btn buttonColor">Register</button>
            </Link>
            </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Landing;
