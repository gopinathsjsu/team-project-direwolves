import React, { Component } from "react";
import {
  FormGroup,
  Label,
  Input,
  Col
} from "reactstrap";
import { Container,Form, FormControl,Button, Row} from "react-bootstrap";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import { Link } from "react-router-dom";
import { formatAMPM } from "./../Services/ControllerUtils";
import NavigationBar from "../Navbar/Navbar";
import "./mileage.css";

class ManageMileage extends Component {
  constructor(props) {
    super(props);
      this.state = {
        userInfo: {
          firstName:"",
          lastName:"",
          email:"",
          address:"",
          mileagePoint:0,
          isAdmin:false,
        },
        mileageActivity:[],
        error:"",
        isSuccess: false,
      };
  }

  handleChange = e => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = async e => {
    //prevent page from refresh
    e.preventDefault();
    axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .post(`http://localhost:3001/updateProfile`, this.state.userInfo)
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            this.setState({
              isSuccess: true,
              loginError:""
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
  getMileageActivity(){
    axios.get(`http://localhost:3001/getMileageActivity?userId=${this.state.userInfo._id}`).then(response=>{
        if(response.status==200){
            console.log(response.data);
            this.setState({
              mileageActivity:response.data.data
            })
            console.log(this.state.mileageActivity);
        }else{
            this.setState({
                error:response.error
            })
        }
    }).catch(()=>{
        this.setState({
            error:"Error while getting mileage points"
        })
    })
  }

  componentDidMount() {
    if (typeof Storage !== "undefined") {
      if (localStorage.key("userData")) {
        this.setState({
            userInfo: Object.assign(
            this.state.userInfo,
            JSON.parse(localStorage.getItem("userData"))
          )
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
    let mileage = null;
    if (this.state.isSuccess) {
      return <Redirect to='/createReservation' />
    }

    if(!localStorage.key("userData")){
      return <Redirect to='/login' />
    }

    if(this.state.mileageActivity!=null && this.state.mileageActivity.length>0) { 
      mileage=this.state.mileageActivity.map((activity,idx)=>{
        console.log(activity);
        if(activity.isMileage){
          return (
            <span style={{color:"red"}}>-{activity.price}</span>
          );
        }else{
          return (
            <span style={{color:"green"}}>+{activity.price}*0.1</span>
          );
        }
      });  
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
            <div className="row" style={{paddingTop:"80px", paddingBottom:"40px"}}>
             <div className="col-sm-2">Hi {this.state.userInfo.firstName}</div>
             <div className="col-sm-6"><h3><center>Manage Mileage Rewards</center></h3></div>
             <div className="col-sm-3">Your Current Mileage Points : {this.state.userInfo.mileagePoint}</div>
             </div>
            <div className="row">
              <div className="col col-sm-3"></div>
              <div className="col col-sm-6">
                <div
                  id="errorLogin"
                  hidden={this.state.error.length > 0 ? false : true}
                  className="alert alert-danger"
                  role="alert"
                >
                  {this.state.error}
                </div>
                <Form onSubmit={this.handleSubmit} className="form-stacked">
                   <Row>
                       <Col>
                        <FormGroup>
                            <Label for="firstname">
                            FirstName
                            </Label>
                            <Input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="First Name"
                            onChange={this.handleChange}
                            value={this.state.userInfo.firstName}
                            required
                            ></Input>
                        </FormGroup>
                       </Col>
                       <Col>
                       <FormGroup>
                            <Label for="lastname">
                            LastName
                            </Label>
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
                  <FormGroup>
                    <Label htmlFor="address">
                      Address
                    </Label>
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Address"
                      value={this.state.userInfo.address}
                      onChange={this.handleChange}
                    ></Input>
                  </FormGroup>
                  <FormGroup row>
                    <Col>
                      <Button
                        type="submit"
                        color="btn btn-primary"
                      >
                       Update
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </div>
            </div>
            <Container style={{ padding: "0 50px" }}>
            {this.state.mileageActivity &&
             this.state.mileageActivity.map((item,idx) => (
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
                        {/* {item.arrivalAirport.name}, {item.arrivalAirport.city} */}
                      </Col>
                    </Row>
                    <Row className="item" style={{ width: "85%" }}>
                      <Col className="time">
                        <div>Depart at </div>
                        <div>{formatAMPM(item.flightId.departureDateTime)}</div>
                      </Col>
                      <Col className="time">
                        <div>Arrives at </div>
                        <div>{formatAMPM(item.flightId.arrivalDateTime)}</div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={3} className="right">
                    <div style={{ textAlign: "center" }}>
                      Price : {item.price}<br/>
                      MileagePoint:{item.isMileage?<span style={{color:"red"}}>-{item.price}</span>:<span style={{color:"green"}}>+{Math.round(item.price*0.1)}</span>}
                    </div>
                    <div>
                    </div>
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
