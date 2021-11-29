import React, { Component } from 'react';
import { Card, Col, Row, ToggleButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ButtonGroup } from "react-bootstrap";
import { getDateFromStr, getDateFromUtils, getTimeFromStr, } from '../../Services/ControllerUtils';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            flightName: "Flight1",
            flightNumber: "12ABCFli",
            source: "SJC",
            destination: "HYD",
            noOfSeats: "100",
            airline: "AL1",
            departureTime: "11/22/2022 11:45",
            arrivalTime: "11/23/2022 11:45",
            // trip: "O",
            radios: [
                { name: "O", value: "O" },
                { name: "T", value: "T" }
            ],
            numberOfPassengers: 10,
            mileagePay: false,
        };
    }

    onSubmit = async (event) => {
        event.preventDefault();

    }


    render() {
        return (
            <React.Fragment>
                <div style={{ padding: "10%" }}>
                    <Row><h3>Your Selected flight details</h3></Row>
                    <Row>
                        <Row>
                            <Col>
                                <label>Trip: </label>
                                {this.state.trip}
                                <ButtonGroup toggle>
                                    {this.state.radios.map((radio, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            type="radio"
                                            variant={"light"}
                                            name="radio"
                                            value={radio.value}
                                            checked={this.state.trip === radio.value}
                                            onClick={e => {
                                                console.log(e.currentTarget.value);
                                                console.log(e.target.value);
                                                this.setState({ trip: e.currentTarget.value });
                                            }
                                            }
                                        >
                                            {radio.value}
                                            {radio.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>

                            </Col>
                            <Col> <span>Pay With Mileage Points <input type="checkbox" id="mileagepointspayment" value={this.state.mileagePay} onChange={(e) => {
                                        this.setState({ mileagePay: !this.state.mileagePay });
                                    }} /></span></Col>
                        </Row>
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
                        <Row>
                            <Col>
                                <Row>Number of passengers</Row>
                                <Row><input className="form-control" type="text" id="passengers" value={this.state.numberOfPassengers} onChange={(e) => {
                                    this.setState({ numberOfPassengers: Number(e.target.value) });
                                }} /></Row>
                            </Col>
                        </Row>
                        {[...Array(this.state.numberOfPassengers)].map((e, i) =>
                            <Card key={i} style={{ margin: "1%" }}>
                                <Card.Body>
                                    <Card.Subtitle className="mb-2 text-muted">Passenger #{i + 1} details:</Card.Subtitle>
                                    <Row>
                                        <Col>
                                            First Name:
                                            <input className="form-control" type="text" placeholder="Enter First Name" />
                                        </Col>

                                        <Col>
                                            Last Name:
                                            <input className="form-control" type="text" placeholder="Enter First Name" />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>)}
                    </Row>
                    <hr />
                    <pre>{JSON.stringify(this.state, "", 2)}</pre>
                </div>
            </React.Fragment>
        );
    }
}


export default Dashboard;