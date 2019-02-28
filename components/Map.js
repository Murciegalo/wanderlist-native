import React, { Component } from 'react';
import MapView, { UrlTile, Marker } from 'react-native-maps';
import { Platform, StyleSheet } from 'react-native';

export default class Map extends Component {
  constructor(){
    super();
    this.state = {
      region: {
        latitude: 20,
        longitude: 0,
        latitudeDelta: 100,
        longitudeDelta: 50,
      },
    }
  }
  
  render() {
      // Adds Markers to the map at the coordinates of all of the countries on the users list.
      const listMarkers = this.props.user.countries.map(country =>(
        <Marker
          key={country.id}
          coordinate={{latitude: country.latlng[0], longitude: country.latlng[1]}}
          title={country.name}
        />
      ));

    return (
      <MapView
        style={styles.map}
        region={this.state.region}
        onRegionChangeComplete={(region) => this.setState({ region })}
        mapType={Platform.OS == "android" ? "none" : "standard"}
        rotateEnabled={false}
        scrollEnabled={true}
        zoomEnabled={true}
        showsUserLocation
      >
        <UrlTile
            urlTemplate='http://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
            zIndex={0}
            maximumZ={19}
        />
        {listMarkers}
      </MapView> 
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});