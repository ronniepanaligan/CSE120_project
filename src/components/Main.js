import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {indigo500, pinkA500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router'
import Nav from './Nav';
import HomePage from './homePage';
import ClassListPage from './classListPage';
import RegisterPage from './registerPage';
import SchedulePage from './schedulePage';
import LoginPage from './loginPage';
import Auth from '../modules/Auth'

const styles = {
  container: {
    height: '100%',
    backgroundColor: '#FAFAFA'
  },
  footer: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    paddingTop: 20
  },
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    accent1Color: pinkA500,
  },
});

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      email: 'o'
    };
    this.toggleAuthStatus = this.toggleAuthStatus.bind(this);
    this.setEmail = this.setEmail.bind(this);
  }

  componentDidMount() {
    this.toggleAuthStatus();
    console.log('this email ' + this.state.email)
    if(this.state.authenticated)
      console.log('logged')
  }

  toggleAuthStatus() {
    this.setState({ authenticated: Auth.isUserAuthenticated() })
    if(this.state.authenticated)
      console.log('logged')
  }

  setEmail(e) {
    this.setState({ email: e})
    console.log("hi");
  }

  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <div style={styles.header}>
          <BrowserRouter>
            <div>
              <Nav toggleAuthStatus={this.toggleAuthStatus} authenticated={this.state.authenticated}/>
              <Route exact path="/" render={() =>
                this.state.authenticated ? (
                  <Redirect to="/home" />
                ) : (
                  <LoginPage toggleAuthStatus={this.toggleAuthStatus} />
                )
              }/>
              <Route exact path="/home" render={()=><HomePage authenticated={this.state.authenticated} />}/>
              <Route exact path="/classListings" component={ClassListPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/schedules" component={SchedulePage} />
            </div>
            </BrowserRouter>
          </div>
          <div style={styles.footer}>

          </div>
          <div style={styles.float}>

          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
