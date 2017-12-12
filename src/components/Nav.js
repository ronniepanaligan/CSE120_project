import React from 'react';
import AppBar from 'material-ui/AppBar';
import LeftDrawer from './leftDrawer';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';

const buttonStyle = {
  backgroundColor: 'transparent',
  color: 'white',
  marginTop: '6px'
};

class Nav extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {open: false};

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleTouchMap() {
    this.setState({open: !this.state.open});
  }

  handleLogout(e) {
    Auth.deauthenticateUser();
    this.props.toggleAuthStatus();
  }

  render() {
    //determine what navbar to render
    if(this.props.authenticated) {
      return (
        <div>
          <AppBar
            title="UCM Registration"
            showMenuIconButton={true}
            iconElementRight={
              <div>
                <Link to='/'><FlatButton label="Home" style={buttonStyle}/></Link>
                <Link to='/register'><FlatButton label="Register" style={buttonStyle}/></Link>
                <Link to='/classListings'><FlatButton label="Class Listing" style={buttonStyle}/></Link>
                <Link to='/schedules'><FlatButton label="Schedules" style={buttonStyle}/></Link>
                <Link to='/'><FlatButton label="Logout" onClick={this.handleLogout} style={buttonStyle}/></Link>
              </div>
            }
            onLeftIconButtonTouchTap = { this.handleTouchMap.bind(this) }
          />
          <LeftDrawer open={this.state.open} />
        </div>
      );
    } else {
    return (
      <div>
        <AppBar
          title="UCM Registration"
          showMenuIconButton={true}
          iconElementRight={
              <Link to='/'><FlatButton label="Login" style={buttonStyle}/></Link>
          }

          onLeftIconButtonTouchTap = { this.handleTouchMap.bind(this) }
        />
        <LeftDrawer open={this.state.open} />
      </div>
    );
  }
}
}

export default Nav;
