import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class SchedCard extends React.Component {
  render() {
    return (
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
    );
  }
}

export default SchedCard;
