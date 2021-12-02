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
import { Link } from "react-router-dom";
import { formatAMPM, getTimeDifference } from "./../Services/ControllerUtils";

class SearchFlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      departLocId: "",
      arriveLocId: "",
      departLoc: "",
      arriveLoc: "",
      departLocation: null,
      arriveLocation: null,
      departDate: "",
      departDateString: null,
      passengers: "",
      radios: [
        { name: "Dollars", value: "D" },
        { name: "Points", value: "P" },
      ],
      currency: "D",
      airports: {},
      showResults: false,
    };
  }

  componentDidMount = async () => {
    this.getAirports();
  };

  getAirports = async () => {
    await axios.get(`http://localhost:3001/allAirports`).then((response) => {
      console.log(response.data);
      if (response.status === 200) this.setState({ airports: response.data });
    });
  };

  searchFLights = async () => {
    let data = {
      departLoc: this.state.departLocId,
      arriveLoc: this.state.arriveLocId,
      departDate: this.state.departDate,
      passengers: this.state.passengers,
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
  };
  render() {
    console.log(this.state);
    let airportList = Object.keys(this.state.airports).map((key) => (
      <option
        value={this.state.airports[key].city}
        key={this.state.airports[key].city}
      />
    ));
    return (
      <>
        <div style={{ backgroundColor: "red" }}>NavBar - to be implemented</div>
        <div>Search Flights</div>
        <Container fluid>
          <Form>
            <Row>
              <Col>DEPART</Col>
              <Col>ARRIVE</Col>
              <Col>DEPART DATE</Col>
              <Col>PASSENGERS</Col>
              <Col>CURRENCY</Col>
              <Col></Col>
            </Row>
            <Row>
              <Col style={{ display: "flex", flexDirection: "column" }} md={2}>
                <InputGroup size="lg">
                  <FormControl
                    aria-label="Large"
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
                <span>{this.state.departLocation}</span>
              </Col>
              <Col style={{ display: "flex", flexDirection: "column" }} md={2}>
                <InputGroup size="lg">
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
                <span>{this.state.arriveLocation}</span>
              </Col>
              <Col style={{ display: "flex", flexDirection: "column" }} md={2}>
                <Form.Group controlId="departDate">
                  <Form.Control
                    type="date"
                    size="lg"
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
                <span>{this.state.departDateString}</span>
              </Col>
              <Col style={{ display: "flex", flexDirection: "column" }} md={2}>
                <Form.Group controlId="departDate">
                  <Form.Control
                    type="number"
                    size="lg"
                    defaultValue={this.state.passengers}
                    onChange={(e) => {
                      this.setState({
                        passengers: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col style={{ display: "flex", flexDirection: "column" }} md={2}>
                <ButtonGroup toggle="true">
                  {this.state.radios.map((radio, idx) => (
                    <Button
                      key={idx}
                      type="radio"
                      variant={"light"}
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
              <Col style={{ display: "flex", flexDirection: "column" }} md={2}>
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    this.searchFLights();
                  }}
                >
                  Seach FLights
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
        <Container>
          {this.state.showResults &&
            this.state.flights.map((item) => (
              <Container>
                <Row>
                  <div>
                    #{item.name} - number {item.number}
                  </div>
                </Row>
                <Row>
                  <Col>
                    {item.departureAirport.name}, {item.departureAirport.city}
                  </Col>
                  <Col> To </Col>
                  <Col>
                    {item.arrivalAirport.name}, {item.arrivalAirport.city}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>Depart at</div>
                    <div>{formatAMPM(item.departureDateTime)}</div>
                  </Col>
                  <Col>
                    <div>Arrives at</div>
                    <div>{formatAMPM(item.arrivalDateTime)}</div>
                  </Col>
                  <Col>
                    <div>Duration</div>
                    <div>
                      {getTimeDifference(
                        item.arrivalDateTime,
                        item.departureDateTime
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>
                      Price : {this.state.currency === "D" ? "$" : ""}
                      {this.state.currency === "D"
                        ? item.price
                        : 1000 * item.price}{" "}
                      {this.state.currency === "P" ? "Points" : ""}
                    </div>
                  </Col>
                  <Col>
                    <Link
                      to={{
                        pathname: "/createReservation",
                        query: item,
                        modeOfPayment: this.state.currency,
                      }}
                    >
                      Book Flight
                    </Link>
                  </Col>
                </Row>
              </Container>
            ))}
        </Container>
      </>
    );
  }
}

export default SearchFlights;
