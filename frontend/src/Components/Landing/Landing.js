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
      if (JSON.parse(localStorage.getItem("userData")).isAdmin) {
        return <Redirect to="/createFlight" />;
      } else {
        return <Redirect to="/flights" />;
      }
    }
    return (
      <div className="container-fluid">
        <div className="landing_img" style={{ maxHeight: "100vh" }}>
          <div className="row">
            <div className="col-sm-9">
              {/* <img
                src={icon}
                style={{
                  width: "50px",
                  left: "180px",
                  position: "absolute",
                  paddingTop: "10px",
                  color:"#32689a"
                }}
              /> */}
              <p
                style={{
                  fontFamily: "system-ui",
                  fontWeight: "50px",
                  paddingLeft: "355px",
                  paddingTop: "10px",
                  color: "#32689a",
                  letterSpacing: "6px",
                  fontFamily: "fantasy",
                }}
              >
                Direwolves Airlines
              </p>
            </div>
            <div className="col-sm-3">
              <Link to="/login" style={{ padding: "20px" }}>
                <button
                  style={{
                    fontWeight: "900",
                    fontFamily: "fantasy",
                    letterSpacing: "5px",
                  }}
                  className="btn btn-primary-outline "
                >
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button
                  style={{
                    fontWeight: "900",
                    fontFamily: "fantasy",
                    letterSpacing: "5px",
                  }}
                  className="btn btn-primary-outline"
                >
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
