import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import cookies from 'react-cookie';

const style = {
  marginTop: '50px'
}

class HomePage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        currentItem: '',
        username: this.props.name,
        user: {
          email: '',
          ucmID: '',
          firstName: '',
          lastName: '',
          major: ''
        }
      }
    }

  componentDidMount(){
    if(this.props.authenticated) {
      let currentUser = localStorage.getItem('user');
      let a = JSON.parse(currentUser);
      console.log(a)
      this.setState({
        user: {
          email: a.email,
          ucmID: a.ucmID,
          firstName: a.firstName,
          lastName: a.lastName,
          major: a.major
        }
      });
    }
    console.log(this.state);
  }

  render() {
    return (
      <div style={style}>
        <Grid>
          <p>Welcome {this.state.user.firstName}!</p>
          <Row>
            <Col lg={4} s={6}>
            <Card>
              <CardHeader />
              <CardMedia overlay={<CardTitle title="Overlay title" />}>
                <img src="images/nature-600-337.jpg" alt="" />
              </CardMedia>
              <CardTitle title="Register" subtitle="Select a class to register for your next semester" />
              <CardActions>
                <FlatButton label="Get started" />
              </CardActions>
            </Card>
            </Col>
            <Col lg={4} s={6}>
            <Card>
              <CardHeader />
              <CardMedia overlay={<CardTitle title="Overlay title" />}>
                <img src="images/nature-600-337.jpg" alt="" />
              </CardMedia>
              <CardTitle title="Classes" subtitle="View UC Merced's entire class schedule for the upcoming semester" />
              <CardActions>
                <FlatButton label="Get started" />
              </CardActions>
            </Card>
            </Col>
            <Col lg={4} s={6}>
            <Card>
              <CardHeader />
              <CardMedia overlay={<CardTitle title="Overlay title" />}>
                <img src="images/nature-600-337.jpg" alt="" />
              </CardMedia>
              <CardTitle title="Schedules" subtitle="Create or view a customized schedule to get ready for the next semester" />
              <CardActions>
                <FlatButton label="Get started" />
              </CardActions>
            </Card>
            </Col>
          </Row>
        </Grid>
      </div>

    );
  }
}

export default HomePage;
