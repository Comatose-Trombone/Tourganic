import React from 'react'
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

export default class SearchMap extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        key: `Taiwan`,
        defaultAnimation: 2,
      }]
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
              defaultZoom={6}
              defaultCenter={{lat: 25.0112183, lng: 121.52067570000001}}>
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