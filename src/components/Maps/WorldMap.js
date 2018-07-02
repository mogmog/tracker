import React, {Component} from 'react';
import ReactMapboxGl, {GeoJSONLayer, Layer, Source, Feature, Marker, Popup} from 'react-mapbox-gl';
import geojsonExtent from '@mapbox/geojson-extent';

import styles from './WorldMap.less';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw",
});


export default class extends Component {

  shouldComponentUpdate() {
    return true;
  }

   componentDidUpdate() {

     const { geo } = this.props;

     if (this.map) {

       this.map.fitBounds(geojsonExtent(geo), {
         padding: 20,
         duration: 50
       });
     }
   }

  render() {

    const { geo, markers } = this.props;

    return (
      <Map
        className={styles.worldmap}
        onStyleLoad={(map) => {
          this.map = map;

          map.fitBounds(geojsonExtent(geo), {
            padding: 70,
            duration: 1000
          });

        } }
        style='mapbox://styles/mogmog/cjieefufm1vbv2ssb2pbthu9h'
        zoom={[3]}
        containerStyle={{
          "height": "350px",
          "maxWidth": "100%"
        }}>

        <GeoJSONLayer

          fillPaint={{"fill-color": "blue", "fill-opacity": 0.1}}
          data={geo} />

        {markers.features.map((marker) => <Marker coordinates={marker.geometry.coordinates}>
          <div style={{ 'backgroundColor': '#e74c3c', 'borderRadius': '50%', 'width': '20px', 'height': '20px', 'border': '4px solid #eaa29b' }}/>
        </Marker>)}


        { markers.features.map((marker, key) => <Popup offset={[0, -30]} key={key} coordinates={marker.geometry.coordinates}> <div style={{ 'background': 'white',
          'color': '#3f618c',
          'fontWeight': 400,
          'padding': '5px',
          'borderRadius': '5px' }}> <div>{marker.properties.description}</div></div> </Popup>) }


      </Map>
    );
  }
}
