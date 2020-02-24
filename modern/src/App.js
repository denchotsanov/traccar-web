import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import SettingsPage from './SettingsPage';
import { useUser } from "./context/auth";

//class App extends Component {
//  render() {
//    let user = useUser();
//    return (
//      <Fragment>
//        <CssBaseline />
    //        <Switch>
    //          <Route exact path='/'>
//            {user ? <MainPage /> : <LoginPage />}
//          </Route>
//          <Route exact path='/login'>
//            <LoginPage/>
//          </Route>
//          <Route exact path='/settings' component={SettingsPage} />
//        </Switch>
//      </Fragment>
//    );
//  }


/**
 * Top-level Application
 * @type: React Component
 */
function App() {
  let user = useUser();
  return (
    <Fragment>
      <CssBaseline />
      <Switch>
        <Route exact path='/'>
            { user ? <MainPage /> : <LoginPage />}
            </Route>
        <Route exact path='/settings' component={SettingsPage} />
      </Switch>
    </Fragment>
  );
}

export default App;
