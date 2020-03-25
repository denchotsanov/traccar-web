import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import MainToobar from './MainToolbar';
import SocketController from './SocketController';




const styles = theme => ({
    root: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },

});

class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        fetch('/api/session').then(response => {
          if (response.ok) {
            this.setState({
              loading: false
            });
          } else {
            this.props.history.push('/login');
          }
        });
      }

    render() {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
            <SocketController />
            <MainToobar history={this.props.history} />
        </div>
    );
    }
}

export default withStyles(styles)(SettingsPage);