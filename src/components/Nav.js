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

const buttonStyle = {
  backgroundColor: 'transparent',
  color: 'white',
  marginTop: '6px'
};

class AppBarExampleIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleTouchMap() {
    this.setState({open: !this.state.open});
  }

  render() {
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
            </div>
          }

          onLeftIconButtonTouchTap = { this.handleTouchMap.bind(this) }
        />
        <LeftDrawer open={this.state.open} />
      </div>
    );
  }

}

export default AppBarExampleIcon;
