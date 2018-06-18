import React, {Component} from 'react';
import ReactMapboxGl, {GeoJSONLayer, Layer, Source, Feature, Marker, Popup} from 'react-mapbox-gl';
import geojsonExtent from '@mapbox/geojson-extent';

import 'mapbox-gl/dist/mapbox-gl.css';
import geo from './../../assets/newyork.json';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw",
});

export default class extends Component {

  shouldComponentUpdate() {
    return true;
  }

   componentDidUpdate() {
     if (this.map) {

       this.map.fitBounds(geojsonExtent(geo), {
         padding: 5,
         duration: 1000
       });
     }
   }

  render() {

    return (
      <Map
        onStyleLoad={(map) => {
          this.map = map;

          map.addLayer({
            'id': 'population',
            'type': 'circle',
            'source': {
              type: 'vector',
              url: 'mapbox://examples.8fgz4egr'
            },
            'source-layer': 'sf2010',
            'paint': {
              // make circles larger as the user zooms from z12 to z22
              'circle-radius': {
                'base': 1.75,
                'stops': [[12, 2], [22, 180]]
              },
              // color circles by ethnicity, using a match expression
              // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
              'circle-color': [
                'match',
                ['get', 'ethnicity'],
                'White', '#fbb03b',
                'Black', '#223b53',
                'Hispanic', '#e55e5e',
                'Asian', '#3bb2d0',
                /* other */ '#ccc'
              ]
            }
          });

        } }
        style='mapbox://styles/mogmog/cjieefufm1vbv2ssb2pbthu9h'
        zoom={[3]}
        containerStyle={{
          "height": "300px",
          "maxWidth": "100%"
        }}>

        <GeoJSONLayer

          fillPaint={{"fill-color": "blue", "fill-opacity": 0.1}}
          data={geo} />

      </Map>
    );
  }
}
