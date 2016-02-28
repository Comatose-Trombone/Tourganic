import React from 'react'
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

export default class SearchMap extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      defaultCenter: {}
    }
  }

  componentWillMount() {
    // Create markers for each tour result from the search entry, if there are any search results
    if (this.props.tours.length > 0) {
      var tours = this.props.tours;
      var markers = [];
      tours.forEach(function(tour) {
        var marker = {};
        marker.position = {};
        marker.position.lat = tour.LatLng[0];
        marker.position.lng = tour.LatLng[1];
        markers.push(marker);
      });
      // Set the defaultCenter to the coordinates for the first marker in the list
      this.setState({
        markers: markers,
        defaultCenter: {
          lat: markers[0].position.lat,
          lng: markers[0].position.lng
        }
      })
    }
  }

  render() {
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
              ref={(map) => console.log(map)}
              defaultZoom={12}
              defaultCenter={this.state.defaultCenter}>
              {this.state.markers.map((marker, index) => {
                return (
                  <Marker
                    {...marker}
                    />
                );
              })}
            </GoogleMap>
          }
        />
      </section>
    );
  };
}