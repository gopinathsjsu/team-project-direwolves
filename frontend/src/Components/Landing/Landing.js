import React, { Component } from "react";
import "./landing.css";
import icon from "./../svg/icon2.png";
import { Link, Redirect } from "react-router-dom";

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (localStorage.getItem("userData")) {
      return <Redirect to="/flights" />;
    }
    return (
      <div className="container-fluid">
        <div className="landing_img">
          <div className="row">
            <div className="col-sm-9">
              <img
                src={icon}
                style={{
                  width: "50px",
                  left: "280px",
                  position: "absolute",
                  paddingTop: "10px",
                }}
              />
              <p
                style={{
                  fontFamily: "system-ui",
                  fontWeight: "50px",
                  paddingLeft: "250px",
                  paddingTop: "10px",
                  color: "#7e0f0f",
                }}
              >
                Welcome to Direwolves Airlines
              </p>
            </div>
            <div className="col-sm-3">
              <Link to="/login" style={{ padding: "20px" }}>
                <button className="btn btn-primary-outline ">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-primary-outline">Register</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
