import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import axios from 'axios';

class LoginPage extends React.Component {
  constructor() {
      super();
      this.state = {
        user: {
          email: '',
          password: ''
        }
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.user);
    this.setState({
      user: {
        email: '',
        password: ''
      }
    });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col lg={4} s={6}>
            <Card>
              <CardMedia>
                <div>
                  <TextField floatingLabelText="Email" name="loginEmail" onChange={this.handleChange} value={this.state.user.email}/>
                  <br />
                  <TextField floatingLabelText="Password" type="password" name="loginPassword" onChange={this.handleChange} value={this.state.user.password}  />
                  <br />
                </div>
              </CardMedia>
              <CardActions>
                <FlatButton label="Submit" onTouchTap={this.handleSubmit} />
              </CardActions>
            </Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default LoginPage;
