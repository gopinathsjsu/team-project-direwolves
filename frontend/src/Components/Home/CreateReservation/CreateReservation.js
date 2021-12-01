import React, { Component } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ButtonGroup } from "react-bootstrap";
import {
    getDateFromStr,
    getDateFromUtils,
    getTimeFromStr,
    getUserProfile,
} from "../../Services/ControllerUtils";
import Grid from "@mui/material/Grid";
import seatSVG from "../../svg/seat.svg";
import unoccupiedSeat from "../../svg/seatUnoccupied.svg";
import selectedSeat from "../../svg/seatSelected.svg";
import axios from "axios";
import "./CreateReservation.css";
class CreateReservation extends Component {
    constructor(props) {
        super(props);
        let profile = getUserProfile();

        console.log(this.props);
        console.log(this.props.location);

        console.log("AAAAA"+localStorage.getItem("FlightToBook"));

        // console.log(profile);
        this.state = {
            firstName: profile.firstName,
            lastName: profile.lastName,
            trip: "O",
            userId: profile._id,
            show: false,
            flightName: "Flight1",
            flightNumber: "4444",
            flightId: "61a59d05f5712005236a97bd",
            departureFlightsdafsdfdsfTime: "2021-11-29T00:00:00.000+00:00",
            source: "SJC",
            destination: "HYD",
            noOfSeats: "100",
            airline: "AL1",
            departureTime: "11/22/2022 11:45",
            arrivalTime: "11/23/2022 11:45",
            radios: [
                { name: "One Way", value: "O" },
                { name: "Two Way", value: "T" },
            ],
            numberOfPassengers: 1,
            mileagePay: false,
            passengerData: [],
            numberOfSeatsInFlight: 150,
            price: 100,
            mileagePoints: 120,
            blockedList: []
        };
    }

    componentDidMount() {
        axios.post(`http://localhost:3001/getSeatInfoFromBookings`, {
            flightId: this.state.flightId,
            departureTime: this.state.departureFlightsdafsdfdsfTime,
            arrivalTime: this.state.departureFlightsdafsdfdsfTime
        })
            .then((response) => {
                console.log("Status Code : ", response.status);
                let temp = [];
                if (response.status === 200) {
                    for (let item of response.data.data) {
                        temp.push(Number(item.seatNumber)-1);
                    }
                }
                this.setState({ blockedList: temp });
            });
    }

    onSubmit = async (event) => {
        event.preventDefault();
    };

    updateCustomerPoints(data){
        let p = Number(getUserProfile().mileagePoint);
        let params = {
            userId: data.userId, 
            price: (p?p:0) + (data.isMileage? 1:-1)*data.price, 
        };
        axios.post(`http://localhost:3001/updatePoints`, params).then((response) => {
                console.log("resp for updatePoints ", response);
                localStorage.setItem("userData", JSON.stringify(response.data.data))
            });
    }

    getSeat(i) {
        return (
            Math.floor(i / 6 + 1) + "" + ((i % 6) + 10).toString(36).toUpperCase()
        );
    }

    render() {
        return (
            <React.Fragment>

                <pre>{JSON.stringify(this.props, "", 2)}</pre>
                <hr />
                <Card style={{ padding: "10%", margin: "1% 10% 0 10%" }}>
                    <Row>
                        <h3>Your Selected flight details</h3>
                    </Row>

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
                                            }}>
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
                                <Row>Source</Row>
                                <Row>{this.state.source}</Row>
                            </Col>
                            <Col>
                                <Row>Destination</Row>
                                <Row>{this.state.destination}</Row>
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <br />
                        <Row>
                            <Col>
                                <Row>Departure Date Time</Row>
                                <Row>{getTimeFromStr(this.state.departureTime)}</Row>
                            </Col>
                            <Col>
                                <Row>Arrival Date Time</Row>
                                <Row>{getTimeFromStr(this.state.arrivalTime)}</Row>
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
                                        <b>
                                            {this.state.payingWith === "C" ? "USD" : "Mileage Points"}
                                        </b>
                                    </span>
                                </Row>
                                <Row>
                                    {this.state.payingWith === "C"
                                        ? this.state.price
                                        : this.state.mileagePoints}
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
                            <center>
                                {this.state.selectedSeat && (
                                    <div>
                                        Selected Seat: {this.getSeat(this.state.selectedSeat - 1)}
                                    </div>
                                )}
                            </center>
                            <center className="air">
                                <div
                                    style={{
                                        width: "50%",
                                        border: "solid 0px",
                                        borderRadius: "200px 200px 0px 0px",
                                        padding: "2%",
                                        margin: "3%",
                                        paddingTop: "50%",
                                    }}
                                >
                                    <Grid container>
                                        {[...Array(this.state.numberOfSeatsInFlight)].map(
                                            (e, i) => (
                                                <Grid
                                                    key={i}
                                                    item
                                                    xs={2}
                                                    md={2}
                                                    style={{ justifyContent: "center", fontSize: "10px" }}
                                                >
                                                    <div style={{ fontWeight: "bold" }}>
                                                        {this.getSeat(i)}
                                                    </div>
                                                    <div
                                                        onClick={(e) => {
                                                            if (!this.state.blockedList.includes(i))
                                                                this.setState({ selectedSeat: i + 1 });
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
                                            )
                                        )}
                                    </Grid>
                                </div>
                            </center>
                        </Col>
                        <center>
                            <Button
                                disabled={!this.state.selectedSeat}
                                variant="outline-success"
                                onClick={() => {
                                    let data = {
                                        userId: getUserProfile()._id,
                                        flightId: this.state.flightId,
                                        departureTime: this.state.departureFlightsdafsdfdsfTime,
                                        arrivalTime: this.state.departureFlightsdafsdfdsfTime,
                                        bookingDate: new Date(),
                                        seatNumber: this.state.selectedSeat,
                                        bookingStatus: "Confirmed",
                                        price:
                                            this.state.payingWith === "M"
                                                ? this.state.mileagePoints
                                                : this.state.price,
                                        isMileage: this.state.payingWith === "M",
                                    };
                                    axios
                                        .post(`http://localhost:3001/createReservation`, data)
                                        .then((response) => {
                                            console.log("Status Code : ", response.status);
                                            if (response.status === 200) {
                                                this.updateCustomerPoints(response.data);
                                            } else {
                                                // this.setState({
                                                //   loginError: "User is already registered",
                                                //   authFlag: false,
                                                //   error: {},
                                                // });
                                            }
                                        });
                                }}
                            >
                                Submit
                            </Button>
                        </center>
                    </Row>
                    {/* <pre>{JSON.stringify(this.state, "", 2)}</pre> */}
                </Card>
            </React.Fragment>
        );
    }
}

export default CreateReservation;
