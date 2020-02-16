import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addDevices, updateGroups, convertDateTime } from './actions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';

const mapStateToProps = state => ({
  devices: state.devices,
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

    const devices = this.props.devices.map(function(device) {
       console.log((device.status === 'online' ));
      return (
      <Fragment key={device.id.toString()}>
        <ListItem button className={classes.list}>
          <Avatar className={device.status === 'online' ? classes.avatarOn : classes.avatarOff}>
            <LocationOnIcon className={classes.avatarIcon} />
          </Avatar>
          <ListItemText className={classes.deviceName} primary={device.name} secondary={convertDateTime(device.lastUpdate, session.attributes.timezone)} />
          <ListItemSecondaryAction>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <li>
          <Divider inset />
        </li>
      </Fragment>)
    });

    return (
      <List>
        {devices}
      </List>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(DeviceList));
