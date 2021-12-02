import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from "reactstrap";
import axios from "axios";
import "../styles/loginStyle.css";
import {Redirect} from 'react-router-dom';
class SignUp extends Component {
  constructor(props) {
    super(props);
      this.state = {
        userInfo: {
          name: "",
          lastName: "",
          email: "",
          password: "",
          address:"",
        },
        loginError: "",
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
        .post(`http://localhost:3001/signup`, this.state.userInfo)
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            this.setState({
              isSuccess: true,
              loginError:""
            });
            this.SetLocalStorage(JSON.stringify(response.data));
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

  SetLocalStorage(data) {
    if (typeof Storage !== "undefined") {
      localStorage.clear();
      localStorage.setItem("userData", data);
    }
  }

  render() {
    if (this.state.isSuccess) {
      return <Redirect to='/createReservation' />
    }
    return (
        <div className="container-fluid form-cont">
          <div className="flex-container">
            <div className="row" style={{padding:"120px"}}>
              <div className="col col-sm-3"></div>
              <div className="col col-sm-6">
                <div
                  id="errorLogin"
                  hidden={this.state.loginError.length > 0 ? false : true}
                  className="alert alert-danger"
                  role="alert"
                >
                  {this.state.loginError}
                </div>
                <h3>Create Airline Account</h3>
                <Form onSubmit={this.handleSubmit} className="form-stacked">
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
                    <Label htmlFor="password">
                      And here&apos;s my <strong>password</strong>
                    </Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
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
                        Sign me up!
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
                <a href="/createReservation"> hello boi </a>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default SignUp;
