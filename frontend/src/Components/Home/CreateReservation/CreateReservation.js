import React, { Component } from "react";
import { Card, Col, Row, Button, ButtonGroup } from "react-bootstrap";
import { Redirect, withRouter } from "react-router-dom";
import {
  //   getDateFromStr,
  //   getDateFromUtils,
  getTimeFromStr,
  getUserProfile,
} from "../../Services/ControllerUtils";
import Grid from "@mui/material/Grid";
import seatSVG from "../../svg/seat.svg";
import unoccupiedSeat from "../../svg/seatUnoccupied.svg";
import selectedSeat from "../../svg/seatSelected.svg";
import axios from "axios";
import "./CreateReservation.css";
import NavigationBar from "../../Navbar/Navbar";
import backend from "../../../config";

class CreateReservation extends Component {
  constructor(props) {
    super(props);
    let profile = getUserProfile();
    let flightDetails = this.props.location.query;
    // console.log(flightDetails);
    this.state = {
      firstName: profile ? profile.firstName : "",
      lastName: profile ? profile.lastName : "",
      trip: "O",
      bookingId: flightDetails._id,
      availablePoints: profile ? profile.mileagePoint : 0,
      userId: profile ? profile._id : "",
      show: false,
      flightName: flightDetails.name,
      flightNumber: flightDetails.number,
      editPage: this.props.location.sourcePage === 'E',
      flightId: this.props.location.sourcePage==='E'?flightDetails.flightId._id:flightDetails._id,
      departureDateTime: flightDetails.departureDateTime,
      arrivalDateTime: flightDetails.arrivalDateTime,
      departureShortCode: flightDetails.departureAirport.shortCode,
      arrivalShortCode: flightDetails.arrivalAirport.shortCode,
      departure: flightDetails.departureAirport.name,
      arrival: flightDetails.arrivalAirport.name,
      noOfSeats: flightDetails.airplaneId.noOfSeats,
      premiumSeatPrice: flightDetails.premiumSeatPrice,
      radios: [
        { name: "One Way", value: "O" },
        { name: "Two Way", value: "T" },
      ],
      numberOfPassengers: 1,
      isMileage: this.props.location.modeOfPayment === "P",
      passengerData: [],
      actualPrice: Number(flightDetails.price),
      price: Math.round(
        this.props.location.modeOfPayment === "P"
          ? Number(flightDetails.price) * 10
          : Number(flightDetails.price)
      ),
      blockedList: [],
      selectedSeat: flightDetails.seatNumber?Number(flightDetails.seatNumber):"",
      isSuccess: false
    };
  }

  componentDidMount() {
    axios
      .post(`${backend}/getSeatInfoFromBookings`, {
        flightId: this.state.flightId,
        departureTime: this.state.departureDateTime,
        arrivalTime: this.state.arrivalDateTime,
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
        let temp = [];
        if (response.status === 200) {
          for (let item of response.data.data) {
              let se = Number(item.seatNumber);
              if(this.state.selectedSeat !== se)
                temp.push(se - 1);
          }
        }
        this.setState({ blockedList: temp });
      });
  }

  onSubmit = async (event) => {
    event.preventDefault();
  };

  updateCustomerPoints(data) {
    let p = this.state.availablePoints;
    let params = {
      userId: data.userId,
      price: Math.round(p + (data.isMileage ? -data.price : data.price * 0.1)),
    };
    axios
      .post(`${backend}/updatePoints`, params)
      .then((response) => {
        console.log("resp for updatePoints ", response);
        this.setState({isSuccess:true});
        localStorage.setItem("userData", JSON.stringify(response.data.data));
      });
  }

  getSeat(i) {
    return (
      Math.floor(i / 6 + 1) + "" + ((i % 6) + 10).toString(36).toUpperCase()
    );
  }

  isPremiumSeat(i) {
    return i % 6 === 0 || i % 6 === 5;
  }

  render() {
      if(this.state.isSuccess){
          return <Redirect to="/bookings"/>
      }
    return (
      <React.Fragment>
        {/* <hr /> */}
        {localStorage.getItem("userData") ? (
          <NavigationBar />
        ) : (
          this.props.history.push("/")
        )}

        <Card style={{ padding: "2% 10%", margin: "1% 10% 0 10%" }}>
          <Row>
            <h3>Your Selected flight details</h3>
          </Row>

          {/* <pre>{JSON.stringify(this.state, "", 2)}</pre> */}
          <Row>
            <Row>
              <Col>
                <label>Trip: </label>
                <ButtonGroup toggle>
                  {this.state.radios.map((radio, idx) => (
                    <Button
                      key={idx}
                      type="radio"
                      variant={"light"}
                      name="radio"
                      value={radio.value}
                      checked={this.state.trip === radio.value}
                      onClick={(e) => {
                        this.setState({ trip: e.currentTarget.value });
                      }}
                    >
                      {radio.name} {this.state.trip === radio.value ? "✔" : " "}
                    </Button>
                  ))}
                </ButtonGroup>
              </Col>
              {/* <Col> <span>Pay With Mileage Points <input type="checkbox" id="mileagepointspayment" value={this.state.mileagePay} onChange={(e) => {
                                        this.setState({ mileagePay: !this.state.mileagePay });
                                    }} /></span></Col> */}
            </Row>
            <br />
            <br />
            <hr />
            <br />
            <Row>
              <Col>
                <Row>Flight Number</Row>
                <Row>{this.state.flightNumber}</Row>
              </Col>
              <Col>
                <Row>Flight Name</Row>
                <Row>{this.state.flightName}</Row>
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <Row>
              <Col>
                <Row>Departure Airport</Row>
                <Row>
                  {this.state.departureShortCode} - {this.state.departure}
                </Row>
              </Col>
              <Col>
                <Row>Arrival Airport</Row>
                <Row>
                  {this.state.arrivalShortCode} - {this.state.arrival}
                </Row>
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <Row>
              <Col>
                <Row>Departure Date Time</Row>
                <Row>{getTimeFromStr(this.state.departureDateTime)}</Row>
              </Col>
              <Col>
                <Row>Arrival Date Time</Row>
                <Row>{getTimeFromStr(this.state.arrivalDateTime)}</Row>
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <Row>
              <Col>
                <Row>
                  <span style={{ padding: "0" }}>
                    Paying with{" "}
                    <b>{!this.state.isMileage ? "USD" : "Mileage Points"}</b>
                  </span>
                </Row>
                <Row>
                  {this.state.isMileage ? "" : "$ "}
                  {this.state.price}
                  {this.state.isMileage ? " Pts" : ""}{" "}
                  {this.state.premiumSeatSelected
                    ? "+ $" + this.state.premiumSeatPrice
                    : ""}{" "}
                  , Available Points: {this.state.availablePoints}
                </Row>
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <Card style={{ margin: "1%" }}>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                  Passenger #1 details:
                </Card.Subtitle>
                <Row>
                  <Col>
                    First Name:
                    <input
                      className="form-control"
                      type="text"
                      placeholder={this.state.firstName}
                      disabled
                    />
                  </Col>
                  <Col>
                    Last Name:
                    <input
                      className="form-control"
                      type="text"
                      placeholder={this.state.lastName}
                      disabled
                    />
                  </Col>
                </Row>

                {/* <Row>Number of additional passengers</Row>
                                <Row><input className="form-control" type="text" id="passengers" value={this.state.numberOfPassengers} onChange={(e) => {
                                    this.setState({ numberOfPassengers: Number(e.target.value) });
                                }} /></Row> */}
              </Card.Body>
            </Card>
            {/* {[...Array(this.state.numberOfPassengers)].map((e, i) =>
                            <Card key={i} style={{ margin: "1%" }}>
                                <Card.Body>
                                    <Card.Subtitle className="mb-2 text-muted">Passenger #{i + 2} details:</Card.Subtitle>
                                    <Row>
                                        <Col>
                                            First Name:
                                            <input className="form-control" type="text" placeholder="Enter First Name" onChange={(e)=>{
                                                let list = this.state.passengerData;
                                                if(list[i]){
                                                    list[i].firstName = e.target.value;
                                                }else{
                                                    list.push({
                                                        firstName:e.target.value,
                                                        lastName:""
                                                    })
                                                }
                                                this.setState({passengerData:list});
                                            }}/>
                                        </Col>
                                        <Col>
                                            Last Name:
                                            <input className="form-control" type="text" placeholder="Enter First Name" onChange={(e)=>{
                                                let list = this.state.passengerData;
                                                if(list[i]){
                                                    list[i].lastName = e.target.value;
                                                }else{
                                                    list.push({
                                                        lastName:e.target.value,
                                                        firstName:""
                                                    })
                                                }
                                                this.setState({passengerData:list});
                                            }}/>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>)} */}
          </Row>
          <Row>
            <Col>
              <center className="air">
                <div
                  style={{
                    width: "50%",
                    border: "solid 0px",
                    borderRadius: "200px 200px 0px 0px",
                    padding: "2%",
                    margin: "3%",
                    paddingTop: "30%",
                  }}
                >
                  <div style={{ paddingBottom: "16%" }}>
                    <div>
                      Free Seat:{" "}
                      <img src={unoccupiedSeat} alt="seat" width="40px" />
                    </div>
                    <div>
                      Selected Seat:{" "}
                      <img src={selectedSeat} alt="seat" width="40px" />
                    </div>
                    <div>
                      Already Booked:{" "}
                      <img src={seatSVG} alt="seat" width="40px" />
                    </div>
                  </div>
                  {this.state.selectedSeat && (
                    <div>
                      Selected Seat: {this.getSeat(this.state.selectedSeat - 1)}
                    </div>
                  )}
                  <hr />
                  <Grid container>
                    {[...Array(this.state.noOfSeats)].map((e, i) => (
                      <Grid
                        key={i}
                        item
                        xs={2}
                        md={2}
                        style={{ justifyContent: "center", fontSize: "10px" }}
                      >
                        <div
                          style={{
                            fontWeight: "bold",
                            color: this.isPremiumSeat(i) ? "red" : "black",
                          }}
                        >
                          {this.getSeat(i)}
                        </div>
                        <div
                          onClick={(e) => {
                            if (!this.state.blockedList.includes(i)) {
                              if (this.isPremiumSeat(i)) {
                                if (
                                  window.confirm(
                                    "Premium seat selected, Extra charge of $" +
                                      this.state.premiumSeatPrice +
                                      " is applicable"
                                  )
                                )
                                  this.setState({
                                    selectedSeat: i + 1,
                                    premiumSeatSelected: true,
                                  });
                              } else {
                                this.setState({
                                  selectedSeat: i + 1,
                                  premiumSeatSelected: false,
                                });
                              }
                            }
                          }}
                        >
                          <img
                            src={
                              this.state.blockedList.includes(i)
                                ? seatSVG
                                : this.state.selectedSeat - 1 === i
                                ? selectedSeat
                                : unoccupiedSeat
                            }
                            style={{ color: "pink" }}
                            alt="seat"
                            width="40px"
                          />
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </center>
            </Col>
            <center>
              <Button
                disabled={!this.state.selectedSeat}
                variant="outline-success"
                onClick={() => {
                    if(this.state.editPage){
                        let data = {
                            bookingId: this.state.bookingId,
                            seatNumber: this.state.selectedSeat,
                            bookingStatus: "Updated",
                          };
                          axios
                            .post(`${backend}/updateReservation`, data)
                            .then((response) => {
                              console.log("Status Code : ", response.status);
                              if (response.status === 200) {
                                  this.setState({isSuccess:true});
                              } 
                            });
                    }else{
                        let data = {
                            userId: getUserProfile()._id,
                            flightId: this.state.flightId,
                            departureTime: this.state.departureDateTime,
                            arrivalTime: this.state.arrivalDateTime,
                            bookingDate: new Date(),
                            seatNumber: this.state.selectedSeat,
                            bookingStatus: "Confirmed",
                            price:
                              this.state.price +
                              (this.state.premiumSeatSelected
                                ? this.state.premiumSeatPrice
                                : 0),
                            isMileage: this.state.isMileage,
                          };
                          axios
                            .post(`${backend}/createReservation`, data)
                            .then((response) => {
                              console.log("Status Code : ", response.status);
                              if (response.status === 200) {
                                alert("Flight booked successfully. PNR no:"+response.data._id);
                                this.updateCustomerPoints(response.data);
                              } else {
                                // this.setState({
                                //   loginError: "User is already registered",
                                //   authFlag: false,
                                //   error: {},
                                // });
                              }
                            });
                    }
                  
                }}
              >
                {this.state.editPage?"Update Flight":"Book Flight"}
              </Button>
            </center>
          </Row>
          {/* <pre>{JSON.stringify(this.state, "", 2)}</pre> */}
        </Card>
      </React.Fragment>
    );
  }
}

export default withRouter(CreateReservation);
