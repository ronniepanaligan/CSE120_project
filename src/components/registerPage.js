import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-bootstrap';
import RegisteredClasses from './registerComp/registeredClasses';
import ClassModal from './classModal';
import axios from 'axios';

const style = {
  marginTop: '50px'
}
class RegisterPage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        modalOpen: false,
        username: '',
        items: [],
        selectedClass: '',
        user: {
          email: '',
          ucmID: '',
          savedClasses: [],
          registeredClasses: []
        },
        height: '100px'
      }
      this.toggleModal = this.toggleModal.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

  componentDidMount() {
    let currentUser = localStorage.getItem('user');
    let a = JSON.parse(currentUser);

    axios.get('/api/users/' + a.ucmID)
    .then((res) => {
      console.log('a', res.data.savedClasses)
      this.setState({
        user: {
          email: a.email,
          ucmID: a.ucmID,
          savedClasses: res.data.savedClasses,
          registeredClasses: res.data.registeredClasses
        }
      })
    })
  }

  handleClick(e) {
    this.setState({
      selectedClass: e.crn,
      modalOpen: true
    });
  }

  toggleModal(e){
    if(this.state.modalOpen){
      this.setState({
        modalOpen: false,
        selectedClass: ''
      });
    }
  }

  render() {
    console.log('h',this.state.user.savedClasses);
    return (
      <div style={style}>
        <Grid>
          <Row>
            <div>
              {this.state.modalOpen ? (
                <ClassModal open={true} toggleModal={this.toggleModal} selectedClass={this.state.selectedClass}/>
              ) : (
                <p></p>
              )}
            </div>
          </Row>
          <Row>
            <Col lg={6}>
              <Card style={style}>
                <CardHeader title="Register for Class" subtitle="Input CRN to register for class" />
                <CardActions>
                  <FlatButton label="Get started" />
                </CardActions>
              </Card>
            </Col>
            <Col lg={6}>
              <Card style={style}>
                <CardHeader title="Saved Classes"/>
                  <Table height={this.state.height}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                      <TableRow>
                        <TableHeaderColumn>CRN</TableHeaderColumn>
                        <TableHeaderColumn>Course Title</TableHeaderColumn>
                        <TableHeaderColumn>Time</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                    {this.state.user.savedClasses.map((item) => {
                      return (
                        <TableRow onTouchTap={() => this.handleClick(item)}>>
                          <TableRowColumn>{item.crn}</TableRowColumn>
                          <TableRowColumn>{item.courseTitle}</TableRowColumn>
                          <TableRowColumn>{item.time}</TableRowColumn>
                        </TableRow>
                      )
                    })}
                    </TableBody>
                  </Table>
                </Card>
              </Col>
              </Row>
              <Row>
                <Col lg={12}>
                <Card style={style}>
                  <CardHeader title="Registered Classes"/>
                    <Table>
                      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                          <TableHeaderColumn>CRN</TableHeaderColumn>
                          <TableHeaderColumn>Course Title</TableHeaderColumn>
                          <TableHeaderColumn>Time</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody displayRowCheckbox={false}>
                      {this.state.user.registeredClasses.map((item) => {
                        return (
                          <TableRow onTouchTap={() => this.handleClick(item)}>>
                            <TableRowColumn>{item.crn}</TableRowColumn>
                            <TableRowColumn>{item.courseTitle}</TableRowColumn>
                            <TableRowColumn>{item.time}</TableRowColumn>
                          </TableRow>
                        )
                      })}
                      </TableBody>
                    </Table>
                  </Card>
                </Col>
              </Row>
            </Grid>
          </div>
        )
      }
}

export default RegisterPage;
