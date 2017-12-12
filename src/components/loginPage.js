import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import axios from 'axios';
import { browserHistory } from 'react-router';
import {fetchUser} from '../actions/index';
import cookie from 'react-cookie'

class LoginPage extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        user: {
          email: '',
          password: ''
        },
        isLogged: false
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
    axios.post('/auth/login', {
      email: this.state.user.email,
      password: this.state.user.password
    })
    .then((res => {
      var user = {
        _id: res.data.user._id,
        ucmID: res.data.user.ucmID,
        email: res.data.user.email,
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        major: res.data.user.major
      }
      console.log(res);
      console.log(fetchUser(this.state.user.email));
      localStorage.setItem('token', 'hi');
      localStorage.setItem('user', JSON.stringify(user));
      this.props.toggleAuthStatus();
    }))
    .catch(function(err){
      console.log(err);
    });
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
            <Card className="loginCard">
              <CardMedia>
                <div>
                  <TextField floatingLabelText="Email" name="email" onChange={this.handleChange} value={this.state.user.email}/>
                  <br />
                  <TextField floatingLabelText="Password" type="password" name="password" onChange={this.handleChange} value={this.state.user.password}  />
                  <br />
                </div>
              </CardMedia>
              <CardActions>
                <FlatButton label="Submit" onClick={this.handleSubmit} />
              </CardActions>
            </Card>

      </Grid>
    );
  }
}

export default LoginPage;
