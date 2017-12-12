import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Grid, Row, Col } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import ClassModal from './classModal';
import Snackbar from 'material-ui/Snackbar';

class ClassListPage extends React.Component {
  //this stuff is temporay, just need it to add some data to database
  constructor(props) {
      super(props);
      this.state = {
        classes: [],
        subjects: [],
        modalOpen: false,
        snackOpen: false,
        message: '',
        selectedClass: '',
        crn: '',
        subject: '',
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
      this.toggleModal = this.toggleModal.bind(this);
      this.handleMessage = this.handleMessage.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClick(a, b) {
    this.setState({
      selectedClass: b.crn,
      modalOpen: true
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post('/api/classes', {
      crn: this.state.crn,
      subject: this.state.subject,
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
      subject: '',
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

  toggleModal(e){
    if(this.state.modalOpen){
      this.setState({
        modalOpen: false,
        selectedClass: '',
        message: e,
        snackOpen: true
      });
    }
  }

  componentDidMount() {
    axios.get('/api/classes')
    .then((res) => {
      const newClasses = res.data.map((obj) => obj)
      const newState = []
      console.log('axios 1');
      for(let c in newClasses){
        newState.push({
          crn: newClasses[c].CRN,

        })
      }

      this.setState({
        classes: res.data
        //classes: newClasses
      })
      console.log(this.state.classes)
    })
    .catch(function(err){
      console.log(err);
    });

    axios.get('/api/subjects')
    .then((res) => {
      const subs = res.data.map((obj) => obj);
      console.log(subs[0].title)
      this.setState({
        subjects: res.data
      });
      console.log(this.state.subjects);
    });
  }

  handleMessage = (e) => {
    this.setState({message: 'hello'});
  }

  render() {
    console.log(this.state);
    return (
      <Grid>
        <Row>
          <div>
            <Snackbar open={this.state.snackOpen} message={this.state.message} autoHideDuration={4000} />
            {this.state.modalOpen ? (
              <ClassModal open={true} toggleModal={this.toggleModal} selectedClass={this.state.selectedClass}/>
            ) : (
              <p></p>
            )}
          </div>
          {this.state.subjects.map((sub) => {
            return (
              <Col lg={12}>

              <Card className="cardStyle">
                <CardHeader title={sub.title} />
                <Table style={{ tableLayout: 'auto' }} fixedHeader={false}>
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableHeaderColumn>CRN</TableHeaderColumn>
                    <TableHeaderColumn>Course Number</TableHeaderColumn>
                    <TableHeaderColumn>Course Title</TableHeaderColumn>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    {this.state.classes.map((item) => {
                      if(item.subject == sub.subCode){
                      return (
                        <TableRow onTouchTap={() => this.handleClick(sub.title, item)}>
                          <TableRowColumn>{item.crn}</TableRowColumn>
                          <TableRowColumn>{item.courseNum}</TableRowColumn>
                          <TableRowColumn>{item.courseTitle}</TableRowColumn>
                        </TableRow>
                      )
                    }
                    })}
                  </TableBody>
                </Table>
                </Card>
                </Col>
            )
          })}
        </Row>
        <Row>
          <Col>
            <TextField name="crn" placeholder="crn" onChange={this.handleChange} value={this.state.crn}/>
            <br />
            <TextField name="subject" placeholder="subject" onChange={this.handleChange} value={this.state.subject}/>
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
