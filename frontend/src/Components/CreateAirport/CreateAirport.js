import React, { Component } from "react";
import NavigationBar from "../Navbar/Navbar";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from "reactstrap";

class CreateAirport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      shortCode: "",
      city: "",
    };
  }

  CreateAirport = async () => {
    let Airport = {
      name: this.state.name,
      shortCode: this.state.shortCode,
      city: this.state.city,
    };
    await axios
      .post(`http://localhost:3001/CreateAirport`, Airport)
      .then((response) => {
        alert("Airport has been Created");
        this.setState({
          name: "",
          shortCode: "",
          city: "",
        });
      });
  };

  render() {
    return (
      <>
        {localStorage.getItem("userData") ? (
          <NavigationBar />
        ) : (
          this.props.history.push("/")
        )}
        {localStorage.getItem("userData") &&
        !JSON.parse(localStorage.getItem("userData")).isAdmin
          ? this.props.history.push("/")
          : ""}
        <div>
          <Container style={{ padding: "0 200px" }}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                this.CreateAirport();
              }}
              className="form-stacked"
            >
              <Row>
                <FormGroup>
                  <Label for="firstname">Airport Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder=""
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                    required
                  ></Input>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup>
                  <Label for="firstname">Short Code</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder=""
                    value={this.state.shortCode}
                    onChange={(e) =>
                      this.setState({ shortCode: e.target.value })
                    }
                    required
                  ></Input>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup>
                  <Label for="firstname">City</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder=""
                    value={this.state.city}
                    onChange={(e) => this.setState({ city: e.target.value })}
                    required
                  ></Input>
                </FormGroup>
              </Row>

              <FormGroup row>
                <Col>
                  <Button
                    disabled={
                      !(
                        this.state.name.length != "" &&
                        this.state.shortCode.length != "" &&
                        this.state.city.length != ""
                      )
                    }
                    type="submit"
                    color="btn btn-primary"
                  >
                    Create Airport
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Container>
        </div>
      </>
    );
  }
}

export default withRouter(CreateAirport);
