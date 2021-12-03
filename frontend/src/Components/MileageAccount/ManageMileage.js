import React, { Component } from "react";
import { FormGroup, Label, Input, Col } from "reactstrap";
import { Container, Form, FormControl, Button, Row } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { formatAMPM } from "./../Services/ControllerUtils";
import NavigationBar from "../Navbar/Navbar";
import "./mileage.css";
import ProfilePic from "../svg/profilePic.png";

class ManageMileage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        mileagePoint: 0,
        isAdmin: false,
      },
      mileageActivity: [],
      error: "",
      isSuccess: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  SetLocalStorage(data) {
    if (typeof Storage !== "undefined") {
      localStorage.clear();
      localStorage.setItem("userData", data);
    }
  }

  handleSubmit = async (e) => {
    //prevent page from refresh
    e.preventDefault();
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(`http://localhost:3001/updateProfile`, this.state.userInfo)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.SetLocalStorage(JSON.stringify(this.state.userInfo));
          this.setState({
            isSuccess: true,
            loginError: "",
          });
        } else {
          this.setState({
            loginError: "User is already registered",
            authFlag: false,
            error: {},
          });
        }
      })
      .catch(() => {
        this.setState({
          loginError: "User is already registered",
          authFlag: false,
        });
      });
  };

  ////
  getMileageActivity() {
    axios
      .get(
        `http://localhost:3001/getMileageActivity?userId=${this.state.userInfo._id}`
      )
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          this.setState({
            mileageActivity: response.data.data,
          });
          console.log(this.state.mileageActivity);
        } else {
          this.setState({
            error: response.error,
          });
        }
      })
      .catch(() => {
        this.setState({
          error: "Error while getting mileage points",
        });
      });
  }

  componentDidMount() {
    if (typeof Storage !== "undefined") {
      if (localStorage.key("userData")) {
        this.setState({
          userInfo: Object.assign(
            this.state.userInfo,
            JSON.parse(localStorage.getItem("userData"))
          ),
        });

        this.getMileageActivity();
      }
    }
  }

  SetLocalStorage(data) {
    if (typeof Storage !== "undefined") {
      localStorage.clear();
      localStorage.setItem("userData", data);
    }
  }

  render() {
    if (this.state.isSuccess) {
      alert("Your profile has been updated successfully");
    }

    if (!localStorage.key("userData")) {
      return <Redirect to="/" />;
    }

    return (
      <>
        {localStorage.getItem("userData") ? (
          <NavigationBar />
        ) : (
          this.props.history.push("/")
        )}
        <div className="container-fluid form-cont">
          <div className="flex-container">
            <div
              className="row"
              style={{ paddingTop: "80px", paddingBottom: "40px" }}
            >
              {/* <div className="col-sm-2"></div> Hi {this.state.userInfo.firstName} */}
              <div className="col-sm-1"></div>
              <div className="col-sm-6" style={{ paddingLeft: "50px" }}>
                <h3>Manage Mileage Rewards</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-1"></div>
              <div className="col col-sm-2">
                <img
                  src={ProfilePic}
                  width="300"
                  height="300"
                  style={{ padding: "30px" }}
                ></img>
              </div>
              <div
                className="col col-sm-6"
                style={{ paddingLeft: "50px", marginLeft: "50px" }}
              >
                <div
                  id="errorLogin"
                  hidden={this.state.error.length > 0 ? false : true}
                  className="alert alert-danger"
                  role="alert"
                >
                  {this.state.error}
                </div>
                <Form
                  onSubmit={this.handleSubmit}
                  className="form-stacked"
                  style={{ paddingLeft: "30px" }}
                >
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="firstname">FirstName</Label>
                        <Input
                          type="text"
                          id="name"
                          name="firstName"
                          placeholder="First Name"
                          onChange={this.handleChange}
                          value={this.state.userInfo.firstName}
                          required
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="lastname">LastName</Label>
                        <Input
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Last Name"
                          value={this.state.userInfo.lastName}
                          onChange={this.handleChange}
                          required
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="email">
                          Here&apos;s my <strong>email address</strong>
                        </Label>
                        <Input
                          data-testid="email-input-box"
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email"
                          value={this.state.userInfo.email}
                          onChange={this.handleChange}
                          required
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          type="text"
                          id="address"
                          name="address"
                          placeholder="Address"
                          value={this.state.userInfo.address}
                          onChange={this.handleChange}
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup>
                    <Label htmlFor="mileage">
                      <strong>Current Mileage Points:</strong>
                    </Label>
                    <Label htmlFor="points" style={{ paddingLeft: "5px" }}>
                      {this.state.userInfo.mileagePoint}
                    </Label>
                  </FormGroup>
                  <FormGroup row>
                    <Col>
                      <Button type="submit" color="btn btn-primary">
                        Update
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </div>
            </div>
            <Container style={{ padding: "0 50px" }}>
              {this.state.mileageActivity &&
                this.state.mileageActivity.map((item, idx) => (
                  <Container
                    style={{
                      padding: "20px",
                      border: "1px solid #ddd",
                      borderRadius: "15px",
                    }}
                    className="flight"
                  >
                    <Row>
                      <Col md={9}>
                        <Row className="item">
                          <div>
                            #
                            <span style={{ fontWeight: "bold" }}>
                              {item.flightId.name} {item.flightId.number}
                            </span>
                          </div>
                        </Row>
                        <Row className="item">
                          <Col>
                            {item.flightId.departureAirport.name},{" "}
                            {item.flightId.departureAirport.city}
                            <span style={{ margin: "0 24px" }}>To</span>
                            {item.flightId.arrivalAirport.name},{" "}
                            {item.flightId.arrivalAirport.city}
                          </Col>
                        </Row>
                        <Row className="item" style={{ width: "85%" }}>
                          <Col className="time">
                            <div>Depart at </div>
                            <div>
                              {formatAMPM(item.flightId.departureDateTime)}
                            </div>
                          </Col>
                          <Col className="time">
                            <div>Arrives at </div>
                            <div>
                              {formatAMPM(item.flightId.arrivalDateTime)}
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col md={3} className="right">
                        <div style={{ textAlign: "center" }}>
                          Price : {item.price}
                          <br />
                          MileagePoint:
                          {item.isMileage ? (
                            <span style={{ color: "red" }}>-{item.price}</span>
                          ) : (
                            <span style={{ color: "green" }}>
                              +{Math.round(item.price * 0.1)}
                            </span>
                          )}
                        </div>
                        <div></div>
                      </Col>
                    </Row>
                  </Container>
                ))}
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default ManageMileage;
