import React, { Component } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ButtonGroup } from "react-bootstrap";
import { getDateFromStr, getDateFromUtils, getTimeFromStr, } from '../../Services/ControllerUtils';

class CreateReservation extends Component {
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
            radios: [
                { name: "One Way", value: "O" },
                { name: "Two Way", value: "T" }
            ],
            numberOfPassengers: 1,
            mileagePay: false,
            passengerData:[]
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
                                <ButtonGroup toggle>
                                    {this.state.radios.map((radio, idx) => (
                                        <Button
                                            key={idx}
                                            type="radio"
                                            variant={"light"}
                                            name="radio"
                                            value={radio.value}
                                            checked={this.state.trip === radio.value}
                                            onClick={e => {
                                                this.setState({ trip: e.currentTarget.value });
                                            }}> 
                                            {radio.name} {this.state.trip === radio.value?"✔":" "}
                                        </Button>
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
                                <Row>Paying with</Row>
                                <Row>{this.state.payingWith === "C"?"USD":"Mileage Points"}</Row>
                                <Row>{this.state.payingWith === "C"?this.state.price:this.state.mileagePoints}</Row>
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
                            </Card>)}
                    </Row>
                    <hr />
                    <pre>{JSON.stringify(this.state, "", 2)}</pre>
                </div>
            </React.Fragment>
        );
    }
}


export default CreateReservation;