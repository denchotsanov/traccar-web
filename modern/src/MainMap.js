import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux'
import DivIcon from './leaflet/DivIcon';

const mapStateToProps = state => ({
  positions: state.positions,
  session: state.session,
  server: state.server,
  groups: state.groups,
  devices: state.devices
});

class MainMap extends Component {

  state = {
    lat: 0,
    lng: 0,
    zoom: 3,
  }



  render() {
    const {session} = this.props;
    console.log(this.props);
    var position = [this.state.lat, this.state.lng];
    var zoom = this.state.zoom;
    if(session){
        position = [session.latitude, session.longitude];
        zoom = session.zoom;
    }
    const markers = this.props.positions.map(position =>
      <DivIcon key={position.id.toString()} position={{ lat: position.latitude, lng: position.longitude }} className="" iconSize={[40, 40]}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" stroke="#fff" stroke-width="2.5" fill="#008000" />
          <path d="m25 5v5" stroke="#fff" stroke-width="2.5" transform="rotate(45 25 25)" />
          <image x="13" y="13" fill="#fff" href="/category/car.svg" />
        </svg>
        {position.deviceId}
      </DivIcon>
    );

    return (
      <Map style={{height: this.props.height, width: this.props.width}} center={position} zoom={zoom}>
        <TileLayer attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {markers}
      </Map>
    )
  }
}

export default connect(mapStateToProps)(MainMap);
