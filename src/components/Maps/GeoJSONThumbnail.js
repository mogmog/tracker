import React, {Component} from 'react';
import ReactMapboxGl, {GeoJSONLayer, Layer, Source, Feature, Marker, Popup} from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import geojsonExtent from '@mapbox/geojson-extent';

import 'mapbox-gl/dist/mapbox-gl.css';
import districts from './../../assets/newyork.json';


const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw",
  interactive: false,
});

export default class extends Component {

  // shouldComponentUpdate() {
  //   return true;
  // }
  //
  // componentDidUpdate() {
  //   if (this.map) {
  //     //this.map.jumpTo(this.props.geojson.geometry.coordinates[0][0]);
  //   }
  // }

  render() {

    const geojson = districts;

    console.log(geojson);


    return (
      <Map
        style={{
          version: 8,
          sources: {

          },
          layers: [
            {
              id: 'background',
              type: 'background',
              paint: {
                'background-color': 'white'
              }
            }
          ]

        }}
        onStyleLoad={(map) => {
          this.map = map;

          map.fitBounds(geojsonExtent(geojson), {
            padding: 5,
            duration: 0
          });

        } }
        containerStyle={{
          height: "150px",
          width: "100%"
        }}>

        <GeoJSONLayer

          fillPaint={{"fill-color": "blue", "fill-opacity": 0.1}}
          data={geojson} />

      </Map>
    );
  }
}
