import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row
} from "reactstrap";
import axios from "axios";
import {Navigate} from 'react-router-dom';
class ManageMileage extends Component {
  constructor(props) {
    super(props);
      this.state = {
        userinfo: {
          firstName:"",
          lastName:"",
          email:"",
          address:"",
          mileagePoints:0,
          isAdmin:false,
        },
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

  //// axios.get(`http//localhost:3001/getMileageActivity?userId=${this.state.userInfo._id}`)
  getMileageActivity(){
     

  }

  componentDidMount() {
    if (typeof Storage !== "undefined") {
      if (localStorage.key("userData")) {
        this.getMileageActivity();
        this.setState({
          userinfo: Object.assign(
            this.state.userinfo,
            JSON.parse(localStorage.getItem("userData"))
          )
        });
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
      return <Navigate to='/createReservation' />
    }
    return (
        <div className="container-fluid form-cont">
          <div className="flex-container">
            <div className="row" style={{paddingTop:"80px", paddingBottom:"40px"}}>
             <div className="col-sm-2">Hi {this.state.userinfo.firstName}</div>
             <div className="col-sm-6"><h3><center>Manage Mileage Rewards</center></h3></div>
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
          </div>
        </div>
    );
  }
}

export default ManageMileage;
