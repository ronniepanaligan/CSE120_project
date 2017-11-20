import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class CardClass extends React.Component {
  render() {
    return (
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
    );
  }
}

export default CardClass;
