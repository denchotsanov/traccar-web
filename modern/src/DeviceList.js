import t from './common/localization'
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addDevices, updateGroups, convertDateTime } from './actions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import RemoveDialog from './RemoveDialog'
import { devicesActions } from './store';
import withStyles from '@material-ui/core/styles/withStyles';


const mapStateToProps = state => ({
  devices: Object.values(state.devices.items),

  positions: state.positions,
  session: state.session,
  server: state.server,
  groups: state.groups
});
const styles = themes => ({
    list:{
        padding: "1px 32px 1px 16px",
        "min-height": "35px"
    },
    avatarOn: {
        width:"25px",
        height:"25px",
        "background-color": "#4dfa90ad"
    },
    avatarOff: {
            width:"25px",
            height:"25px",
            "background-color": "#ff5468ad"
    },
    avatarIcon:{
        width:"1rem",
        height:"1rem",
    },
    deviceName:{
        " & span":{
            "font-size":"0.85rem",
            color:"#373ec19c",
            "font-weight": "bold",
        },
        " & p":{
            "font-size":"0.65rem",
        },
    }
});
class DeviceList extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
      	menuAnchorEl: null,
      	removeDialogOpen: false
    	};
  	}
    handleItemClick(device) {
        this.props.dispatch(devicesActions.select(device));
    }

  handleMenuClick(event) {
    this.setState({ menuAnchorEl: event.currentTarget });
  }

  handleMenuClose() {
    this.setState({ menuAnchorEl: null });
  }

  handleMenuEdit() {
    this.props.history.push('/device');
    this.handleMenuClose();
  }

  handleMenuRemove() {
    this.setState({ removeDialogOpen: true });
    this.handleMenuClose();
  }

  componentDidMount() {
    fetch('/api/groups').then(response => {
        if (response.ok) {
          response.json().then(groups => {
              this.props.dispatch(updateGroups(groups));
          });
        }
      });
    fetch('/api/devices').then(response => {
      if (response.ok) {
        response.json().then(devices => {
            this.props.dispatch(addDevices(devices));
        });
      }
    });
  }

  render() {
    const { classes, session } = this.props;

    const devices = this.props.devices.map((device,index,list)=> {
       console.log((device.status === 'online' ));
       return (
          <Fragment key={device.id.toString()}>
            <ListItem button className={classes.list} onClick={() => this.handleItemClick(device)}>
            <ListItemAvatar>
              <Avatar className={device.status === 'online' ? classes.avatarOn : classes.avatarOff}>
                <LocationOnIcon className={classes.avatarIcon} />
              </Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.deviceName} primary={device.name} />

              <ListItemSecondaryAction>
                <IconButton onClick={(event) => this.handleMenuClick(event)}>
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {index < list.length - 1 ? <Divider /> : null}
          </Fragment>
        );
    });
    return (
      <Fragment>
        <List>
          {devices}
        </List>
        <Menu
          id="device-menu"
          anchorEl={this.state.menuAnchorEl}
          keepMounted
          open={Boolean(this.state.menuAnchorEl)}
          onClose={() => this.handleMenuClose()}>
          <MenuItem onClick={() => this.handleMenuEdit()}>{t('sharedEdit')}</MenuItem>
          <MenuItem onClick={() => this.handleMenuRemove()}>{t('sharedRemove')}</MenuItem>
        </Menu>
        <RemoveDialog
          open={this.state.removeDialogOpen}
          onClose={() => { this.setState({ removeDialogOpen: false }) }} />
      </Fragment>
    );
  }

}
export default connect(mapStateToProps)(withStyles(styles)(DeviceList));
