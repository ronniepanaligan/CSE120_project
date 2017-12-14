import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
class LeftDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <Drawer open={this.props.open}>
        <MenuItem>Register</MenuItem>
        <MenuItem>Class Listing</MenuItem>
        <MenuItem>Schedules</MenuItem>
      </Drawer>
      </div>
    );
  }
}

export default LeftDrawer;
