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
        selectedClass: ''
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
  }

  toggleModal(e){
    if(this.state.modalOpen == true){
      this.setState({
        modalOpen: false,
        selectedClass: '',
        message: e,
        snackOpen: true
      });
    }
  }

  componentDidMount() {
    axios.get('/api/lectures')
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
                    <TableHeaderColumn>Seats Available</TableHeaderColumn>

                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    {this.state.classes.map((item) => {
                      if(item.subject == sub.subCode){
                      return (
                        <TableRow onTouchTap={() => this.handleClick(sub.title, item)}>
                          <TableRowColumn>{item.crn}</TableRowColumn>
                          <TableRowColumn>{item.courseNum}</TableRowColumn>
                          <TableRowColumn>{item.courseTitle}</TableRowColumn>
                          <TableRowColumn>{item.seatsAvail}</TableRowColumn>
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
      </Grid>
    );
  }
}

export default ClassListPage;
