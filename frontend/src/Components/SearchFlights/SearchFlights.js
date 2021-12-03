import axios from "axios";
import React, { Component } from "react";
import {
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import NavigationBar from "../Navbar/Navbar";
import { formatAMPM, getTimeDifference } from "./../Services/ControllerUtils";
import "./SearchFlights.css";

class SearchFlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      departLocId: "",
      arriveLocId: "",
      departLoc: "",
      arriveLoc: "",
      departLocation: "",
      arriveLocation: "",
      departDate: "",
      departDateString: "",
      passengers: "",
      radios: [
        { name: "Dollars", value: "D" },
        { name: "Points", value: "P" },
      ],
      currency: "D",
      airports: {},
      showResults: false,
      passengerType: "",
      flights: [],
    };
  }

  componentDidMount = async () => {
    this.getAirports();
    this.getAllFlights();
  };

  getAllFlights = async () => {
    await axios.get(`http://localhost:3001/allFlights`).then((response) => {
      console.log(response.data);
      if (response.status === 200)
        this.setState({ flights: response.data, showResults: true });
    });
  };

  getAirports = async () => {
    await axios.get(`http://localhost:3001/allAirports`).then((response) => {
      console.log(response.data);
      if (response.status === 200) this.setState({ airports: response.data });
    });
  };

  searchFLights = async () => {
    if (
      this.state.departLocId.length > 0 &&
      this.state.arriveLocId &&
      this.state.departDate
    ) {
      let data = {
        departLoc: this.state.departLocId,
        arriveLoc: this.state.arriveLocId,
        departDate: this.state.departDate,
        // passengers: this.state.passengers,
      };
      console.log(data);
      await axios
        .get(`http://localhost:3001/flights`, {
          params: data,
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200)
            this.setState({ flights: response.data, showResults: true });
        });
    }
  };

  render() {
    console.log(this.state);
    let airportList = Object.keys(this.state.airports).map((key) => (
      <option
        value={this.state.airports[key].city}
        key={this.state.airports[key].city}
      />
    ));
    let userData = JSON.parse(localStorage.getItem("userData"));
    return (
      <>
        {localStorage.getItem("userData") ? (
          <NavigationBar />
        ) : (
          this.props.history.push("/")
        )}
        {localStorage.getItem("userData") &&
        JSON.parse(localStorage.getItem("userData")).isAdmin
          ? this.props.history.push("/")
          : ""}
        <Container className="main">Search Flights</Container>
        <Container style={{ margin: "15px auto", padding: "0 120px" }}>
          <Form>
            <Row className="aboveRow" style={{ justifyContent: "center" }}>
              <Col md={2}>
                <div style={{ paddingLeft: "5px" }}>DEPART</div>
              </Col>
              <Col md={2}>
                <div style={{ paddingLeft: "5px" }}>ARRIVE</div>
              </Col>
              <Col md={3}>
                <div style={{ paddingLeft: "5px" }}>DEPART DATE</div>
              </Col>
              {/* <Col>
                <div style={{ paddingLeft: "5px" }}>PASSENGERS</div>
              </Col> */}
              <Col md={3}>
                <div style={{ paddingLeft: "5px" }}>CURRENCY</div>
              </Col>
              <Col md={2}></Col>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Col className="flexColumn" md={2}>
                <InputGroup
                  size="sm"
                  className="mb-0"
                  style={{ margin: "0!important" }}
                >
                  <FormControl
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    list="airportDataList"
                    value={this.state.departLoc}
                    onChange={(e) => {
                      let airport = this.state.airports[e.target.value];
                      if (airport != null) {
                        this.setState({
                          departLocId: airport._id,
                          departLoc: airport.shortCode,
                          departLocation: airport.city,
                        });
                      } else {
                        this.setState({
                          departLocId: "",
                          departLoc: e.target.value,
                          departLocation: "",
                        });
                      }
                    }}
                  />
                </InputGroup>
                <datalist id="airportDataList">{airportList}</datalist>
              </Col>
              <Col className="flexColumn" md={2}>
                <InputGroup
                  size="sm"
                  className="mb-0"
                  style={{ margin: "0!important" }}
                >
                  <FormControl
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                    list="airportDataList"
                    value={this.state.arriveLoc}
                    onChange={(e) => {
                      let airport = this.state.airports[e.target.value];
                      if (airport != null) {
                        this.setState({
                          arriveLocId: airport._id,
                          arriveLoc: airport.shortCode,
                          arriveLocation: airport.city,
                        });
                      } else {
                        this.setState({
                          arriveLocId: "",
                          arriveLoc: e.target.value,
                          arriveLocation: "",
                        });
                      }
                    }}
                  />
                </InputGroup>
                <datalist id="airportDataList">{airportList}</datalist>
              </Col>
              <Col className="flexColumn" md={3}>
                <Form.Group controlId="departDate">
                  <Form.Control
                    type="date"
                    size="sm"
                    defaultValue={this.state.departDate}
                    onChange={(e) => {
                      this.setState({
                        departDate: e.target.value,
                        departDateString: new Date(
                          e.target.value
                        ).toDateString(),
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              {/* <Col className="flexColumn" md={2}>
                <Form.Group controlId="departDate">
                  <Form.Control
                    type="number"
                    size="sm"
                    defaultValue={this.state.passengers}
                    onChange={(e) => {
                      this.setState({
                        passengers: e.target.value,
                        passengerType: "Adult",
                      });
                    }}
                  />
                </Form.Group>
              </Col> */}
              <Col className="flexColumn" md={3}>
                <ButtonGroup toggle="true">
                  {this.state.radios.map((radio, idx) => (
                    <Button
                      key={idx}
                      style={{ padding: "3px", border: "1px solid #ccc" }}
                      type="radio"
                      variant="Info"
                      name="radio"
                      value={radio.value}
                      checked={this.state.currency === radio.value}
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ currency: e.currentTarget.value });
                      }}
                    >
                      {radio.name}
                      {this.state.currency === radio.value ? "✔" : " "}
                    </Button>
                  ))}
                </ButtonGroup>
              </Col>
              <Col className="flexColumn" md={2}>
                <Button
                  type="submit"
                  style={{ padding: "3px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    this.searchFLights();
                  }}
                >
                  Seach FLights
                </Button>
              </Col>
            </Row>
            <Row className="bottomRow" style={{ justifyContent: "center" }}>
              <Col md={2}>
                <div>{this.state.departLocation}</div>
              </Col>
              <Col md={2}>
                <div>{this.state.arriveLocation}</div>
              </Col>
              <Col md={3}>
                {/* <div>{this.state.departDateString}</div> */}
              </Col>
              {/* <Col>
                <div>{this.state.passengerType}</div>
              </Col> */}
              <Col md={3}></Col>
              <Col md={2}></Col>
            </Row>
          </Form>
        </Container>
        <Container style={{ padding: "0 50px" }}>
          {this.state.showResults &&
            this.state.flights &&
            this.state.flights.map((item) => (
              <Container
                style={{
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "15px",
                }}
                className="flight"
                key={item._id}
              >
                <Row>
                  <Col md={9}>
                    <Row className="item">
                      <div>
                        #
                        <span style={{ fontWeight: "bold" }}>
                          {item.name} {item.number}
                        </span>
                      </div>
                    </Row>
                    <Row className="item">
                      <Col>
                        {item.departureAirport.name},{" "}
                        {item.departureAirport.city}
                        <span style={{ margin: "0 24px" }}>To</span>
                        {item.arrivalAirport.name}, {item.arrivalAirport.city}
                      </Col>
                    </Row>
                    <Row className="item" style={{ width: "85%" }}>
                      <Col className="time">
                        <div>Depart at </div>
                        <div>{formatAMPM(item.departureDateTime)}</div>
                      </Col>
                      <Col className="time">
                        <div>Arrives at </div>
                        <div>{formatAMPM(item.arrivalDateTime)}</div>
                      </Col>
                      <Col className="time">
                        <div>Duration </div>
                        <div>
                          {getTimeDifference(
                            item.arrivalDateTime,
                            item.departureDateTime
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={3} className="right">
                    <div style={{ textAlign: "center" }}>
                      Price : {this.state.currency === "D" ? "$" : ""}
                      {this.state.currency === "D"
                        ? item.price
                        : 10 * item.price}{" "}
                      {this.state.currency === "P" ? "Points" : ""}
                      <div style={{ fontSize: "13px" }}>
                        {this.state.currency === "P" &&
                          userData.mileagePoint < item.price * 10 && (
                            <span style={{ color: "red" }}>
                              You don't have enough points
                            </span>
                          )}
                      </div>
                    </div>
                    <div>
                      <Link
                        className="bookFlight"
                        to={{
                          pathname: "/createReservation",
                          query: item,
                          modeOfPayment:
                            this.state.currency === "P" &&
                            userData.mileagePoint < item.price * 10
                              ? "D"
                              : this.state.currency,
                        }}
                      >
                        Book Flight
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Container>
            ))}
        </Container>
      </>
    );
  }
}

export default withRouter(SearchFlights);
