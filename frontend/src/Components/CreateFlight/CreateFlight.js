import React, { Component } from "react";
import NavigationBar from "../Navbar/Navbar";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from "reactstrap";

class CreateFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airports: {},
      name: "",
      number: "",
      departLoc: "",
      arriveLoc: "",
      departDate: "",
      arriveDate: "",
      seats: "",
      price: "",
      premiumSeatPrice: "",
    };
  }

  componentDidMount = () => {
    this.getAirports();
  };

  getAirports = async () => {
    await axios.get(`http://localhost:3001/allAirports`).then((response) => {
      console.log(response.data);
      if (response.status === 200) this.setState({ airports: response.data });
    });
  };

  createFlight = async () => {
    if (
      this.state.name.length != "" &&
      this.state.number.length != "" &&
      this.state.departLoc.length != "" &&
      this.state.arriveLoc.length != "" &&
      this.state.departDate.length != "" &&
      this.state.arriveDate.length != "" &&
      this.state.price.length != "" &&
      this.state.seats.length != "" &&
      this.state.premiumSeatPrice.length != ""
    ) {
      let airplane = {
        noOfSeats: this.state.seats,
        premiumSeatPrice: this.state.premiumSeatPrice,
        seats: [],
      };
      console.log(airplane);
      await axios
        .post(`http://localhost:3001/createAirplane`, airplane)
        .then(async (response1) => {
          console.log(response1.data);
          let flight = {
            name: this.state.name,
            airlineId: null,
            airplaneId: response1.data._id,
            number: this.state.number,
            arrivalAirport: this.state.arriveLoc,
            departureAirport: this.state.departLoc,
            arrivalDateTime: new Date(this.state.arriveDate),
            departureDateTime: new Date(this.state.departDate),
            price: this.state.price,
          };
          console.log(flight);
          await axios
            .post(`http://localhost:3001/createFlight`, flight)
            .then((response2) => {
              console.log(response2.data);
              alert("FLight has been added");
              this.setState({
                name: "",
                number: "",
                departLoc: "",
                arriveLoc: "",
                departDate: "",
                arriveDate: "",
                price: "",
                seats: "",
                premiumSeatPrice: "",
              });
            });
        });
    }
  };

  render() {
    let airportList = Object.keys(this.state.airports).map((key) => (
      <option
        value={this.state.airports[key].city}
        key={this.state.airports[key].city}
      />
    ));
    return (
      <>
        {localStorage.getItem("userData") ? (
          <NavigationBar />
        ) : (
          this.props.history.push("/")
        )}
        {localStorage.getItem("userData") &&
        !JSON.parse(localStorage.getItem("userData")).isAdmin
          ? this.props.history.push("/")
          : ""}
        {/* <div>create flight</div> */}
        {/* <pre>{JSON.stringify(this.state, "", 2)}</pre> */}
        <div>
          <Container style={{ padding: "0 200px" }}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                this.createFlight();
              }}
              className="form-stacked"
            >
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="firstname">Flight Name</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      placeholder=""
                      value={this.state.name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                      required
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="firstname">First Number</Label>
                    <Input
                      type="number"
                      id="name"
                      name="name"
                      placeholder=""
                      value={this.state.value}
                      onChange={(e) =>
                        this.setState({ number: e.target.value })
                      }
                      required
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <Label for="firstname">Departure Airport</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      list="airportDataList"
                      placeholder=""
                      defaultValue={this.state.departLoc}
                      onChange={(e) => {
                        if (this.state.airports[e.target.value] != null) {
                          this.setState({
                            departLoc: this.state.airports[e.target.value]._id,
                          });
                        }
                      }}
                      required
                    ></Input>
                    <datalist id="airportDataList">{airportList}</datalist>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="firstname">Arrival Airport</Label>
                    <Input
                      type="text"
                      id="name"
                      list="airportDataList"
                      name="name"
                      placeholder=""
                      defaultValue={this.state.arriveLoc}
                      onChange={(e) => {
                        if (this.state.airports[e.target.value] != null) {
                          this.setState({
                            arriveLoc: this.state.airports[e.target.value]._id,
                          });
                        }
                      }}
                      required
                    ></Input>
                    <datalist id="airportDataList">{airportList}</datalist>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="firstname">Departure Date Time</Label>
                    <Input
                      type="datetime-local"
                      id="name"
                      name="name"
                      placeholder=""
                      value={this.state.departDate}
                      onChange={(e) =>
                        this.setState({ departDate: e.target.value })
                      }
                      required
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="firstname">Arrival Date Time</Label>
                    <Input
                      type="datetime-local"
                      id="name"
                      name="name"
                      placeholder=""
                      value={this.state.arriveDate}
                      onChange={(e) =>
                        this.setState({ arriveDate: e.target.value })
                      }
                      required
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="firstname">Ticket Price</Label>
                    <Input
                      type="number"
                      id="name"
                      name="name"
                      placeholder=""
                      value={this.state.price}
                      onChange={(e) => this.setState({ price: e.target.value })}
                      required
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="firstname">Total seats</Label>
                    <Input
                      type="number"
                      id="name"
                      name="name"
                      placeholder=""
                      value={this.state.seats}
                      onChange={(e) => this.setState({ seats: e.target.value })}
                      required
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="firstname">Premium Seat Price</Label>
                    <Input
                      type="number"
                      id="name"
                      name="name"
                      placeholder=""
                      value={this.state.premiumSeatPrice}
                      onChange={(e) =>
                        this.setState({ premiumSeatPrice: e.target.value })
                      }
                      required
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup row>
                <Col>
                  <Button
                    disabled={
                      !(
                        this.state.name.length != "" &&
                        this.state.number.length != "" &&
                        this.state.departLoc.length != "" &&
                        this.state.arriveLoc.length != "" &&
                        this.state.departDate.length != "" &&
                        this.state.arriveDate.length != "" &&
                        this.state.price.length != "" &&
                        this.state.seats.length != "" &&
                        this.state.premiumSeatPrice.length != ""
                      )
                    }
                    type="submit"
                    color="btn btn-primary"
                  >
                    Add Flight Details
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Container>
        </div>
      </>
    );
  }
}

export default withRouter(CreateFlight);
