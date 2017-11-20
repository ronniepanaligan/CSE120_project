import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { Grid, Row, Col } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

class ClassListPage extends React.Component {
  //this stuff is temporay, just need it to add some data to database
  constructor(props) {
      super(props);
      this.state = {
        crn: '',
        courseNum: '',
        courseTitle: '',
        units: '',
        actv: '',
        days: '',
        time: '',
        room: '',
        startEnd: '',
        instructor: '',
        maxEnroll: '',
        actEnroll: '',
        seatsAvail: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post('http://localhost:3000/api/classes', {
      crn: this.state.crn,
      courseNum: this.state.courseNum,
      courseTitle: this.state.courseTitle,
      units: this.state.units,
      actv: this.state.actv,
      days: this.state.days,
      time: this.state.time,
      room: this.state.room,
      startEnd: this.state.startEnd,
      instructor: this.state.instructor,
      maxEnroll: this.state.maxEnroll,
      actEnroll: this.state.actEnroll,
      seatsAvail: this.state.seatsAvail
    })
    .then((res) => {
      console.log(c);
    })
    .catch((err) => {
      console.log(err);
    })

    this.setState({
      crn: '',
      courseNum: '',
      courseTitle: '',
      units: '',
      actv: '',
      days: '',
      time: '',
      room: '',
      startEnd: '',
      instructor: '',
      maxEnroll: '',
      actEnroll: '',
      seatsAvail: ''
    });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col>
            <TextField name="crn" placeholder="crn" onChange={this.handleChange} value={this.state.crn}/>
            <br />
            <TextField name="courseNum" placeholder="courseNum" onChange={this.handleChange} value={this.state.courseNum}/>
            <br />
            <TextField name="courseTitle" placeholder="courseTitle" onChange={this.handleChange} value={this.state.courseTitle}/>
            <br />
            <TextField name="units" placeholder="units" onChange={this.handleChange} value={this.state.units}/>
            <br />
            <TextField name="actv" placeholder="actv" onChange={this.handleChange} value={this.state.actv}/>
            <br />
            <TextField name="days" placeholder="days" onChange={this.handleChange} value={this.state.days}/>
            <br />
            <TextField name="time" placeholder="time" onChange={this.handleChange} value={this.state.time}/>
            <br />
            <TextField name="room" placeholder="room" onChange={this.handleChange} value={this.state.room}/>
            <br />
            <TextField name="startEnd" placeholder="startEnd" onChange={this.handleChange} value={this.state.startEnd}/>
            <br />
            <TextField name="maxEnroll" placeholder="maxEnroll?" onChange={this.handleChange} value={this.state.maxEnroll}/>
            <br />
            <TextField name="actEnroll" placeholder="actEnroll" onChange={this.handleChange} value={this.state.actEnroll}/>
            <br />
            <TextField name="seatsAvail" placeholder="seatsAvail?" onChange={this.handleChange} value={this.state.seatsAvail}/>
            <br />
            <FlatButton label="Submit" onTouchTap={this.handleSubmit} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default ClassListPage;
