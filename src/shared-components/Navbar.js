import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
//ADD DRAWER
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AppBarMenu from 'material-ui/svg-icons/navigation/menu';
import RefreshButton from 'material-ui/svg-icons/navigation/refresh';
import Avatar from 'material-ui/Avatar';
import { bindActionCreators } from 'redux';
//import {Link} from 'react-router';
import { connect } from 'react-redux';
import { toggleDrawer } from '../app/reducer';
import { getIsDrawerOpen } from '../app/selectors';
import { actions as authActions, selectors as authSelectors } from '../auth';


const Navbar = ({ actions, profile, handleLogin, handleLogout, onToggleDrawer, isDrawerOpen  }) => (
<div>
  <AppBar
    title="Title"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    showMenuIconButton={true}
    iconElementLeft={<IconButton onClick={() => onToggleDrawer()}><AppBarMenu /></IconButton>}
    iconElementRight={!profile ? <FlatButton onClick={handleLogin} label="Login" /> :   <IconMenu
    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
    <MenuItem primaryText="Refresh" rightIcon={<RefreshButton />}/>
    <MenuItem primaryText="Profile"  />
    <MenuItem primaryText="Sign out" onClick={() => handleLogout()} rightIcon={profile ? <Avatar src={profile.get('picture')} /> : ""}  />
    </IconMenu>}
  />
  <Drawer docked={false} open={isDrawerOpen} onRequestChange={() => onToggleDrawer()} >
   <MenuItem onTouchTap={() => onToggleDrawer()}>Menu Item 1</MenuItem>
   <MenuItem onTouchTap={() => onToggleDrawer()}>Menu Item 2</MenuItem>
  </Drawer>
</div>
);

Navbar.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
  onToggleDrawer: PropTypes.func.isRequired,
  profile: ImmutablePropTypes.map,
};

Navbar.defaultProps = {
  profile: null,
};


const mapStateToProps = state => (
  {
    isDrawerOpen: getIsDrawerOpen(state),
    profile: authSelectors.getProfile(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({ toggleDrawer, ...authActions }, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
