import React, { Component } from "react";
import { Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { withRouter } from "react-router-dom";
import icon from "./../svg/icon2.png";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div style={{ marginBottom: "75px" }}>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          fixed="top"
        >
          <Container style={{ position: "relative" }}>
            <Navbar.Brand
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              <img
                src={icon}
                style={{
                  width: "50px",
                  top: "-8px",
                  left: "-50px",
                  position: "absolute",
                }}
              />
              Direwolves Airlines
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  onClick={() => {
                    this.props.history.push("/flights");
                  }}
                >
                  Search Flights
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    this.props.history.push("/bookings");
                  }}
                >
                  Bookings
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link
                  onClick={() => {
                    this.props.history.push("/manageProfile");
                  }}
                >
                  Manage Profile
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    localStorage.clear();
                    this.props.history.push("/");
                  }}
                >
                  Log out
                </Nav.Link>
                {/* <Nav.Link href="/login">Log In</Nav.Link> */}
                {/* <Nav.Link href="/register">Sign Up</Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavigationBar);
