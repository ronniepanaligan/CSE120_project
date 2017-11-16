import React from 'react';
import AppBar from 'material-ui/AppBar';
import LeftDrawer from './LeftDrawer';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';

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
          iconElementRight={<FlatButton label="View Classes" />}
          onLeftIconButtonTouchTap = { this.handleTouchMap.bind(this) }
        />
        <LeftDrawer open={this.state.open} />
      </div>
    );
  }

}

export default AppBarExampleIcon;
