import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-bootstrap';
import CardClass from './regCard';
import ClassCard from './classCard';
import SchedCard from './schedCard';

const style = {
  marginTop: '50px'
}
class HomePage extends React.Component {
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
            <Col lg={4} s={6}>
              <CardClass />
            </Col>
            <Col lg={4} s={6}>
              <ClassCard />
            </Col>
            <Col lg={4} s={6}>
              <SchedCard />
            </Col>
          </Row>
        </Grid>
      </div>

    );
  }
}

export default HomePage;
