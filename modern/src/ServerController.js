import { Component } from 'react';
import { connect } from 'react-redux';
import { updateServer } from './actions';

class ServerController extends Component {

  componentDidMount() {
   fetch('/api/server').then(response => {
          if (response.ok) {
              response.json().then(server => {
                 this.props.dispatch(updateServer(server));
              });
          }
      });
  }

  render() {
    return null;
  }
}
export default connect()(ServerController);