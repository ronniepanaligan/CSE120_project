import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-bootstrap';
import CardClass from './classCard';
import RegisteredClasses from './registerComp/registeredClasses';

const style = {
  marginTop: '50px'
}
class RegisterPage extends React.Component {
  constructor() {
      super();
      this.state = {
        currentItem: '',
        username: '',
        items: []
      }
    }

  render() {
    return (
      <div style={style}>
        <Grid>
          <Row>
            <Col lg={6}>
              <Card style={style}>
                <CardHeader title="Register for Class" subtitle="Input CRN to register for class" />
                <CardActions>
                  <FlatButton label="Get started" />
                </CardActions>
              </Card>
            </Col>
            <Col lg={6}>
              <Card style={style}>
                <CardHeader title="Register for Class" subtitle="Input CRN to register for class" />
                <CardActions>
                  <FlatButton label="Get started" />
                </CardActions>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card style={style}>
                <CardHeader title="Registered Classes" />
                <CardMedia>
                  <RegisteredClasses />
                </CardMedia>
              </Card>
            </Col>
        </Row>
      </Grid>
    </div>
  )
}
}

export default RegisterPage;
