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
class ClassModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      currentItem: '',
      username: '',
      items: [],
      selectedLab: '',
      selectedClass: {
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
        seatsAvail: '',
        labs: [],
        discussions: []
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount(e) {
    if(this.props.selectedClass != '') {
      axios.get('/api/classes/' + this.props.selectedClass)
      .then((res) => {
        console.log('crn: ' + res.data.crn)
        axios.get('/api/reqClass/' + res.data.crn)
        .then((response) => {
          var lab = response.data.labs;
          var labs = []
          for(let l in lab){
            labs.push(lab[l]);
          }
          this.setState({
            selectedClass: {
              crn: res.data.crn,
              subject: res.data.subject,
              courseNum: res.data.courseNum,
              courseTitle: res.data.courseTitle,
              units: res.data.units,
              actv: res.data.actv,
              days: res.data.days,
              time: res.data.time,
              room: res.data.room,
              startEnd: res.data.startEnd,
              instructor: res.data.instructor,
              maxEnroll: res.data.maxEnroll,
              actEnroll: res.data.actEnroll,
              seatsAvail: res.data.seatsAvail,
              labs : labs
            },
            open: this.props.open
          })
        })
      });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSave(e) {
    e.preventDefault();

    let currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(currentUser.ucmID)
    console.log(this.state.selectedClass.crn)
    axios.post('/api/saveClass', {
      'ucmID': currentUser.ucmID,
      'crn' : this.state.selectedClass.crn
    });
    axios.post('/api/saveClass', {
      'ucmID': currentUser.ucmID,
      'crn' : this.state.selectedLab
    })
    .then((res) => {
      this.setState({open: false});
      this.props.toggleModal(res.data.msg);
    })
  }

  handleRegister(e) {
    e.preventDefault();

    let currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(currentUser.ucmID)
    console.log(this.state.selectedClass.crn)
    axios.post('/api/saveClass', {
      'ucmID': currentUser.ucmID,
      'c_id' : this.state.selectedClass.crn
    })
    .then((res) => {
      axios.post('/api/saveClass', {
        'ucmID': currentUser.ucmID,
        'c_id' : this.state.selectedLab
      })
      .then((response) => {
        this.setState({open: false});
        this.props.toggleModal(res.data.msg);
      })
    })
  }

  handleSelectLab(crn){
    console.log('clock')
    this.setState({
      selectedLab: crn
    });
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
        label="Save Class"
        primary={true}
        onTouchTap={this.handleSave}
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
          <p>This class requires you to register for a corresponding lab</p>
          <Table>
            <TableHeader displaySelectAll={false}>
              <TableHeaderColumn>CRN</TableHeaderColumn>
              <TableHeaderColumn>ACTV</TableHeaderColumn>
              <TableHeaderColumn>Course Number</TableHeaderColumn>
              <TableHeaderColumn>Course Title</TableHeaderColumn>
              <TableHeaderColumn>Time</TableHeaderColumn>
              <TableHeaderColumn>Days</TableHeaderColumn>
            </TableHeader>
            <TableBody>
              {this.state.selectedClass.labs.map((item) => {
                return (
                  <TableRow onTouchTap={() => this.handleSelectLab(item.crn)}>
                    <TableRowColumn>{item.crn}</TableRowColumn>
                    <TableRowColumn>{item.actv}</TableRowColumn>
                    <TableRowColumn>{item.courseNum}</TableRowColumn>
                    <TableRowColumn>{item.courseTitle}</TableRowColumn>
                    <TableRowColumn>{item.startTime.time}-{item.endTime.time}</TableRowColumn>
                    <TableRowColumn>{item.days}</TableRowColumn>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <p>{this.state.selectedClass.units}</p>
        </Dialog>
      </div>
    );
  }
}

export default ClassModal;
