import React from 'react'
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from "react-google-maps";

export default class SearchMap extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      defaultCenter: {}
    }
  }

  // Creates markers for each passed in tour, giving them the proper Lat/Lng coords for proper map placement
  componentWillMount() {
    var tours = this.props.tours;
    var markers = [];
    tours.forEach(function(tour) {
      // Gives each marker Lat/Lng coordinates, a name, and a showInfo property set to false initially
      var marker = {};
      marker.name = tour.name;
      marker.showInfo = false;
      marker.position = {};
      marker.position.lat = tour.LatLng[0];
      marker.position.lng = tour.LatLng[1];
      markers.push(marker);
    })
    // Set the defaultCenter of map to the coordinates for the first marker in the list
    this.setState({
      markers: markers,
      defaultCenter: {
        lat: markers[0].position.lat,
        lng: markers[0].position.lng
      }
    });
  }

  // If marker is clicked, its respective showInfo property is toggled, either showing or hiding the info
  handleMarkerClick(marker) {
    marker.showInfo = !marker.showInfo;
    this.setState(this.state);
  }

  // Renders the info window for a specific marker when its showInfo property is true (onClick)
  renderInfoWindow(ref, marker) {
    return (
      <InfoWindow key={`${ref}_info_window`} >
        <div>
          {marker.name}
        </div>  
      </InfoWindow> 
    );
  }

  render() {
    // Adapted from react-google-maps 'Pop-up InfoWindow' example
    return (
      <section className="map">
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props}
              style={{
                height: "100%",
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              defaultZoom={12}
              defaultCenter={this.state.defaultCenter}>
              {this.state.markers.map((marker, index) => {
                var ref = `marker_${index}`;
                return (
                  <Marker {...marker} onClick={this.handleMarkerClick.bind(this, marker)}>
                  {marker.showInfo ? this.renderInfoWindow(ref, marker) : null}
                  </Marker>
                );
              })}
            </GoogleMap>
          }
        />
      </section>
    );
  };
}