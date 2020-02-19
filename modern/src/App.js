import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import SettingsPage from './SettingsPage';

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Switch>
          <Route exact path='/'>
                <MainPage />
          </Route>
          <Route exact path='/login'>
            <LoginPage/>
          </Route>
          <Route exact path='/settings' component={SettingsPage} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
