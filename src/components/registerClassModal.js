import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

//Modal for when a user clicks on a class, contains the class information
class RegisterClassModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      currentItem: '',
      username: '',
      items: [],
      labDetails: {
        crn: '',
        subject: '',
        courseNum: '',
        courseTitle: '',
        units: '',
        actv: '',
        days: '',
        startTime: '',
        endTime: '',
        room: '',
        startEnd: '',
        instructor: '',
        maxEnroll: '',
        actEnroll: '',
        seatsAvail: '',
      },
      selectedClass: {
        lab: '',
        crn: '',
        subject: '',
        courseNum: '',
        courseTitle: '',
        units: '',
        actv: '',
        days: '',
        startTime: '',
        endTime: '',
        room: '',
        startEnd: '',
        instructor: '',
        maxEnroll: '',
        actEnroll: '',
        seatsAvail: '',
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount(e) {
    if(this.props.selectedClass != '') {
      let currentUser = localStorage.getItem('user');
      let a = JSON.parse(currentUser);
      var lab = '';
      axios.get('/api/classes/' + this.props.selectedClass)
      .then((res) => {
        axios.get('/api/reqClass/' + this.props.selectedClass)
        .then((response) => {
          console.log(response.data)
          if(response.data.labs.length > 0){
            var reqClass = response.data.labs;
            axios.get('/api/users/' + a.ucmID)
            .then((r) => {
              var data = r.data.savedClasses.map((item) =>{
                console.log('user' + item.crn)
                reqClass.map((item1) => {
                  console.log(item1.crn)
                  if(item.crn == item1.crn){
                    lab = item.crn;
                  }
                  })
                })
                this.setState({
                  selectedClass: {
                    lab: lab,
                    crn: res.data.crn,
                    subject: res.data.subject,
                    courseNum: res.data.courseNum,
                    courseTitle: res.data.courseTitle,
                    units: res.data.units,
                    actv: res.data.actv,
                    startTime: res.data.startTime.time,
                    endTime: res.data.endTime.time,
                    days: res.data.days,
                    room: res.data.room,
                    instructor: res.data.instructor,
                    maxEnroll: res.data.maxEnroll,
                    actEnroll: res.data.actEnroll,
                    seatsAvail: res.data.seatsAvail
                  },
                  open: this.props.open
                });
              })
            }
          })
      });
    }
  }

  handleRemove(e) {
    if(this.props.tableClick == 'R'){

    }
    let currentUser = localStorage.getItem('user');
    let a = JSON.parse(currentUser);
    console.log('delete', this.state.selectedClass.crn);
    axios.post('/api/registerClass/remove', {
      ucmID: a.ucmID,
      crn: this.state.selectedClass.crn
    })
    .then((response) => {
      //check if user registerd for a corresponding class
      axios.get('/api/reqClass/' + this.state.selectedClass.crn)
      .then((res) => {
        var reqClass = res.data.labs;
        console.log(reqClass);
        axios.get('/api/users/' + a.ucmID)
        .then((r) => {
          var data = r.data.savedClasses.map((item) =>{
            reqClass.map((item1) => {
              if(item.crn == item1.crn)
              axios.post('/api/registerClass/remove', {
                ucmID: a.ucmID,
                crn: item1.crn
              })
            })
          })
        })
      })
      this.props.fetchData();
      this.setState({open: false});
      this.props.toggleModal('class removed');
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    let a = JSON.parse(localStorage.getItem('user'));
    console.log(this.state.selectedClass.crn)
    axios.post('/api/registerClass', {
      'ucmID': a.ucmID,
      'crn' : this.state.selectedClass.crn
    })
    .then((response) => {
      //check if user registerd for a corresponding class
      axios.get('/api/reqClass/' + this.state.selectedClass.crn)
      .then((res) => {
        var reqClass = res.data.labs;
        console.log(reqClass);
        axios.get('/api/users/' + a.ucmID)
        .then((r) => {
          var data = r.data.savedClasses.map((item) =>{
            reqClass.map((item1) => {
              if(item.crn == item1.crn)
              axios.post('/api/registerClass', {
                ucmID: a.ucmID,
                crn: item1.crn
              })
            })
          })
        })
      })
      this.props.fetchData();
      this.setState({open: false});
      this.props.toggleModal('class registered');
    })
  }


  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({
      open: false,
      selectedClass: ''
    });
    this.props.toggleModal();
  };

  render() {
    console.log(this.state.selectedClass);
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Remove Class"
        primary={true}
        onTouchTap={this.handleRemove}
      />,
      <FlatButton
        label="Register"
        primary={true}
        onTouchTap={this.handleRegister}
      />,
    ];

    return (
      <div>
        <Dialog
          title={this.state.selectedClass.courseTitle}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

        <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableHeaderColumn>Times</TableHeaderColumn>
            <TableHeaderColumn>days</TableHeaderColumn>
            <TableHeaderColumn>room</TableHeaderColumn>
            <TableHeaderColumn>Seats Available</TableHeaderColumn>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn>{this.state.selectedClass.startTime}-{this.state.selectedClass.endTime}</TableRowColumn>
                  <TableRowColumn>{this.state.selectedClass.days}</TableRowColumn>
                  <TableRowColumn>{this.state.selectedClass.room}</TableRowColumn>
                  <TableRowColumn>{this.state.selectedClass.seatsAvail}</TableRowColumn>
                </TableRow>
          </TableBody>
          </Table>
          <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableHeaderColumn>Times</TableHeaderColumn>
              <TableHeaderColumn>days</TableHeaderColumn>
              <TableHeaderColumn>room</TableHeaderColumn>
              <TableHeaderColumn>Seats Available</TableHeaderColumn>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                  <TableRow onTouchTap={() => this.handleSelectLab(item.crn)}>
                    <TableRowColumn>{this.state.labDetails.startTime} {this.state.labDetails.endTime}</TableRowColumn>
                    <TableRowColumn>{this.state.labDetails.days}</TableRowColumn>
                    <TableRowColumn>{this.state.labDetails.room}</TableRowColumn>
                    <TableRowColumn>{this.state.labDetails.seatsAvail}</TableRowColumn>
                  </TableRow>
            </TableBody>
        </Table>
        </Dialog>
      </div>
    );
  }
}

export default RegisterClassModal;
