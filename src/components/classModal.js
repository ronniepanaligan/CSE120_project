import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';

//Modal for when a user clicks on a class, contains the class information
class ClassModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      currentItem: '',
      username: '',
      items: [],
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
        seatsAvail: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(e) {
    if(this.props.selectedClass != '') {
      axios.get('/api/classes/' + this.props.selectedClass)
      .then((res) => {
        console.log('crn: ' + res.data.crn)
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
            seatsAvail: res.data.seatsAvail
          },
          open: this.props.open
        });
      });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(currentUser.ucmID)
    console.log(this.state.selectedClass.crn)
    axios.post('/api/saveClass', {
      'ucmID': currentUser.ucmID,
      'crn' : this.state.selectedClass.crn
    })
    .then((res) => {
      this.setState({open: false});
      this.props.toggleModal(res.data.msg);
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
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Save Class"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
      <FlatButton
        label="Register"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
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
        <br />
        <p>{this.state.selectedClass.units}</p>
        </Dialog>
      </div>
    );
  }
}

export default ClassModal;
