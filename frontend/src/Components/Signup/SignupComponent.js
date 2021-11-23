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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
          date:"",
          role:""
        },
        date:new Date(),
        error: {},
        loginError: "",
        auth: true
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
        .post(`http://localhost:8000/signupUser`, this.state.userInfo)
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            this.setState({
              loginError: "",
              authFlag: true,
            });
            //this.props.RegisterUser({ data }); //reducer call
           // this.SetLocalStorage(data);
            alert("Successfully Created! Please Continue to Login");
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
            error: {},
          });
        });
    
  };

  SetLocalStorage(userInfo) {
    if (typeof Storage !== "undefined") {
      console.log("Set local storage here");
      localStorage.clear();
      try {
        localStorage.setItem("userData", userInfo);
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    return (
        <div className="container-fluid form-cont">
          <div className="flex-container">
            <div className="row">
              <div className="col col-sm-6">
                <img src="./assets/splitwiselogo-01.png" alt="..."></img>
              </div>
              <div className="col col-sm-6">
                <div
                  id="errorLogin"
                  hidden={this.state.loginError.length > 0 ? false : true}
                  className="alert alert-danger"
                  role="alert"
                >
                  {this.state.loginError}
                </div>
                <h3>Create Account</h3>
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
                      invalid={this.state.error.name ? true : false}
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
                  <FormGroup>
                    <Label htmlFor="dob">
                      DateOfBirth
                    </Label>
                    <DatePicker
                    selected={this.state.date}
                    onChange={this.handleChange}
                    showTimeSelect
                    dateFormat="Pp"
                    />
                  </FormGroup>
                  <FormGroup row>
                    <Col>
                      <Button
                        type="submit"
                        color="btn btn-Normal"
                      >
                        Sign me up!
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

export default SignUp;
