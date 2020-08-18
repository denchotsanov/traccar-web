import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { devicesActions } from './store';
import t from './common/localization';
import RemoveDialog from './RemoveDialog';

const useStyles = makeStyles(theme => ({
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
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const DeviceList = () => {
  const [menuDeviceId, setMenuDeviceId] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const devices = useSelector(state => Object.values(state.devices.items));
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleMenuClick = (event, deviceId) => {
    setMenuDeviceId(deviceId);
    setMenuAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  }

  const handleMenuEdit = () => {
    history.push(`/device/${menuDeviceId}`);
    handleMenuClose();
  }

  const handleMenuRemove = () => {
    setRemoveDialogOpen(true);
    handleMenuClose();
  }

  const handleAdd = () => {
    history.push('/device');
    handleMenuClose();
  }

  const handleRemoveResult = (removed) => {
    setRemoveDialogOpen(false);
    if (removed) {
      dispatch(devicesActions.remove(menuDeviceId));
    }
  }

  return (
    <Fragment>
      <List className={classes.list}>
        {devices.map((device, index, list) => (
          <Fragment key={device.id}>
            <ListItem button key={device.id} className={classes.list} onClick={() => dispatch(devicesActions.select(device))}>
              <ListItemAvatar>
                <Avatar className={device.status === 'online' ? classes.avatarOn : classes.avatarOff}>
                  <LocationOnIcon className={classes.avatarIcon} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.deviceName} primary={device.name} secondary={device.uniqueId} />
              <ListItemSecondaryAction>
                <IconButton onClick={(event) => handleMenuClick(event, device.id)}>
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {index < list.length - 1 ? <Divider /> : null}
          </Fragment>
        ))}
      </List>
      <Fab size="medium" color="primary" className={classes.fab} onClick={handleAdd}>
        <AddIcon />
      </Fab>
      <Menu id="device-menu" anchorEl={menuAnchorEl} keepMounted open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuEdit}>{t('sharedEdit')}</MenuItem>
        <MenuItem onClick={handleMenuRemove}>{t('sharedRemove')}</MenuItem>
      </Menu>
      <RemoveDialog deviceId={menuDeviceId} open={removeDialogOpen} onResult={handleRemoveResult} />
    </Fragment>
  );
}

export default DeviceList;
