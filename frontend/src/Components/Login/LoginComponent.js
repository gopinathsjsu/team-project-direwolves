import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  FormFeedback,
} from "reactstrap";
import axios from "axios";
// import { connect } from "react-redux";
// import * as Action from "../../actions/index";

class Login extends Component {
  constructor(props) {
    super(props);
      this.state = {
        email: "",
        password: "",
        error: "",
        formerror: {},
        auth: true,
      };
  }


  emailEventHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  passEventHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  ///LoginUser'
  submitForm = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .post(`http://localhost:8000/loginUser`, data)
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            this.getCurrentUserInfo();
            this.setState({
              error: "",
            });
            //<Home></Home>;
          } else {
            this.setState({
              error: "Please enter correct credentials",
              authFlag: false,
              formerror: {},
            });
          }
        })
        .catch(() => {
          this.setState({
            error: "Please enter correct credentials",
            formerror: {},
          });
        });
  };

  getCurrentUserInfo() {
    axios
      .get(`http://localhost:8000/getUserInfo`, {
        params: {
          userEmail: this.state.email,
        },
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.SetLocalStorage(JSON.stringify(response.data[0]));
          this.setState({
            authFlag: "true",
          });
        }
      })
      .catch(() => {
        this.setState({
          error: "Not able to find user",
        });
      });
  }

  SetLocalStorage(data) {
    if (typeof Storage !== "undefined") {
      localStorage.clear();
      localStorage.setItem("userData", data);
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
                hidden={this.state.error.length > 0 ? false : true}
                className="alert alert-danger"
                role="alert"
              >
                {this.state.error}
              </div>
              <h3>Login</h3>
              <Form className="form-stacked">
                <FormGroup>
                  <Label htmlFor="email" className="Lable-align">
                    Email address
                  </Label>
                  <Input
                    data-testid="email-input-box"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.emailEventHandler}
                    invalid={this.state.formerror.email ? true : false}
                  ></Input>
                  <FormFeedback>{this.state.formerror.email}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.passEventHandler}
                    invalid={this.state.formerror.password ? true : false}
                  ></Input>
                  <FormFeedback>{this.state.formerror.password}</FormFeedback>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <Button
                      data-testid="btn-submit"
                      type="submit"
                      className="btn btn-Normal"
                      onClick={this.submitForm}
                      color="btn btn-primary"
                    >
                      Login
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

export default Login; 
