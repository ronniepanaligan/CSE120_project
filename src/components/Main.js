/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
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
import AppBarExampleIcon from './Nav';
import HomePage from './homePage';
import ClassListPage from './classListPage';
import RegisterPage from './registerPage';
import SchedulePage from './schedulePage';
import LoginPage from './loginPage'

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
  float: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  header: {

  }
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    accent1Color: pinkA500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      items: []
    };
  }

  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <div style={styles.header}>
          <BrowserRouter>
            <div>
              <AppBarExampleIcon />
              <Route exact path="/" component={LoginPage} />
              <Route exact path="/home" component={HomePage} />
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
