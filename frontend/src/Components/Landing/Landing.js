import React, { Component } from "react";
import "./landing.css";

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="landing_img">
        <p style={{fontFamily:"Cursive", fontWeight:"50px", padding:"20px"}}>Welcome to Direwolves Airlines</p>
        </div>
      </div>
    );
  }
}

export default Landing;

{/* <div className="col col-sm-1"></div>
<div className="col col-sm-3"></div>
</div>
<div id="footer" className="row">
<h1
  style={{
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    marginLeft: 350,
  }}
>
  Less stress when sharing expenses with anyone
</h1>
<p
  style={{
    alignSelf: "center",
    textAlign: "center",
    marginLeft: 350,
  }}
>
  Keep track of your shared expenses and balances with housemates,
  trips, groups, friends, and family
</p> */}