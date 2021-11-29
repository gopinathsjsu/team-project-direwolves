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
import {Navigate} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
      this.state = {
        email: "",
        password: "",
        error: "",
        isSuccess: false
      };
  }

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
        .post(`http://localhost:3001/login`, data)
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            this.setState({
              error: "",
              isSuccess:true
            });
            this.SetLocalStorage(JSON.stringify(response.data));
          } else {
            this.setState({
              error: "Please enter correct credentials",
              isSuccess: false,
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
          <div className="row" style={{padding:"120px"}}>
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
              <h3>Login</h3>
              <Form onSubmit={this.submitForm} method="post" className="form-stacked">
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
                    onChange={(e)=>{
                      this.setState({email: e.target.value})
                    }}
                    required
                  ></Input>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e)=>{
                      this.setState({password: e.target.value})
                    }}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <Button
                      data-testid="btn-submit"
                      type="submit"
                      className="btn btn-Normal"
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
