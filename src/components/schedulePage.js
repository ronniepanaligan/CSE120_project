import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Grid, Row, Col } from 'react-bootstrap';

const style = {
  marginTop: '50px'
}
class SchedulePage extends React.Component {
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
            <Col lg={4}>
              <Card>
                <CardMedia>
                  <ContentAdd />
                </CardMedia>
              </Card>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default SchedulePage;
