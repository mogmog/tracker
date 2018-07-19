import React, {PureComponent} from 'react';
import numeral from 'numeral';
import {connect} from 'dva';
import { Row, Col, Form, Card, Select, Icon, Avatar, List, Tooltip, Dropdown, Menu, Table, Button } from 'antd';

import { Link } from 'dva/router';

import TagSelect from 'components/TagSelect';
import StandardFormRow from 'components/StandardFormRow';



export default class Base extends PureComponent {

  componentDidMount() {

    var browser = null;
    var renderer = null;
    var map = null;
    var pinModel = null;
    var pinModelSelected = null;
    var geodata = null;

    var canvas, canvasCtx;
    var profilePanel, distancePointer, heightPointer, heightPointer2;


    var linePoints = [
      [-122.48369693756, 37.83381888486, 0],
      [-122.48344236083, 37.83317489144, 20],
      [-122.48335253015, 37.83270036637, 20],
      [-122.48361819152, 37.83205636317, 20],
      [-122.48404026031, 37.83114119107, 20],
      [-122.48404026031, 37.83049717427, 20],
      [-122.48348236083, 37.82992094395, 20],
      [-122.48356819152, 37.82954808664, 20],
      [-122.48507022857, 37.82944639795, 20],
      [-122.48610019683, 37.82880236636, 20],
      [-122.48695850372, 37.82931081282, 20],
      [-122.48700141906, 37.83080223556, 20],
      [-122.48751640319, 37.83168351665, 20],
      [-122.48803138732, 37.83215804826, 20],
      [-122.48888969421, 37.83297152392, 20],
      [-122.48987674713, 37.83263257682, 20],
      [-122.49043464660, 37.83293762928, 20],
      [-122.49125003814, 37.83242920781, 20],
      [-122.49163627624, 37.83256478721, 20],
      [-122.49223709106, 37.83337825839, 20],
      [-122.49378204345, 37.83368330777, 20]
    ];

    (function startDemo() {
      // create map in the html div with id 'map-div'
      // parameter 'map' sets path to the map which will be displayed
      // you can create your own map on melown.com
      // position parameter is described in documentation
      // https://github.com/Melown/vts-browser-js/wiki/VTS-Browser-Map-API#position
      // view parameter is described in documentation
      // https://github.com/Melown/vts-browser-js/wiki/VTS-Browser-Map-API#definition-of-view
      browser = vts.browser('map-div', {
        map: 'https://cdn.melown.com/mario/store/melown2015/map-config/melown/VTS-Tutorial-map/mapConfig.json',
        position : [ 'obj', -122.48443455025, 37.83071587047, 'float', 0.00, 19.04, -49.56, 0.00, 1946.45, 55.00 ]
      });

      //check whether browser is supported
      if (!browser) {
        console.log('Your web browser does not support WebGL');
        return;
      }

      renderer = browser.renderer;

      browser.mapMobileMode = true;

      //callback once is map config loaded
      browser.on('map-loaded', onMapLoaded);


      //browser.on('tick', onTick);
    })();


//set heigth profile pointer accoring to current track position
    function setProfilePointer(p) {

      canvas = profilePanel.getElement('profile-canvas');

      //	alert(canvas);

      var rect = canvas.getRect();


      var x = (12) * rect.width;

      var rect2 = heightPointer.getRect();
      p = map.convertCoordsFromPhysToPublic(p);
//console.log(rect2);
      heightPointer.setStyle('display', 'block');
      heightPointer.setStyle('left', (rect.left + x -(rect2.width*0.5)) + 'px');
      heightPointer.setStyle('top', (rect.top) + 'px');
      heightPointer.setHtml((p[2]).toFixed(2) + " m");

      // heightPointer2.setStyle('display', 'block');
      // heightPointer2.setStyle('left', (rect.left + x - 1) + 'px');
      //heightPointer2.setStyle('top', (rect.top) + 'px');
    }

    function onMapLoaded() {
      map = browser.map;

      map.addRenderSlot('custom-render', onCustomRender, true);
      map.moveRenderSlotAfter('after-map-render', 'custom-render');

      //setInterval(function() {
        //browser.autopilot.setAutorotate(10);
      //}, 2000);


      let mtl = require('./../../assets/markers/alpine.mtl');

      //console.log(mtl);

      //ModelOBJ is the separate modelObj.js library
      pinModel          = new ModelOBJ(map, renderer, { path: 'https://raw.githubusercontent.com/mogmog/tracker/map/src/assets/markers/yellow/pin.obj' });
      pinModelSelected  = new ModelOBJ(map, renderer, { path: 'https://raw.githubusercontent.com/mogmog/tracker/map/src/assets/markers/yellow/pin-selected.obj' });

      // create ui control with info pointers
      var infoPointers = browser.ui.addControl('info-pointers',
        '<div id="distance-div" class="distance-div">' +
        '</div>' +
        '<div id="height-div" class="distance-div">!!!!!' +
        '</div>' +
        '<div id="height-div2" class="pointer-div2">' +
        '</div>');

      distancePointer = infoPointers.getElement('distance-div');


      // create panel with path profile
      profilePanel = browser.ui.addControl('profile-panel',
        '<div id="profile-div" class="profile-div">' +
        '<div id="profile-canvas-holder" class="profile-canvas-holder">' +
        '<canvas id="profile-canvas" class="profile-canvas">' +
        '</canvas>' +
        '</div>' +
        '</div>');






      //create geodata object
      geodata = map.createGeodata();

      //import GeoJSON data
      //polygon are not supported yet
      geodata.importGeoJson(

        {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [-122.48347, 37.82955],
              },
              "properties": {
                "title": "Golden Gate Bridge Vista Point",
              }
            },

            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [

                ]
              }
            }
          ]
        }
      );



      //this function is needed only when 'float' heights are used
      //in case you use data with 'fix' height only then you can
      //skip this function and call makeFreeLayer directly
      geodata.processHeights('node-by-precision', 62, onHeightProcessed);
    }

    function onHeightProcessed() {
      var style = {
        'constants': {
          '@icon-marker': ['icons', 6, 8, 18, 18]
        },

        'bitmaps': {
          'icons': 'http://maps.google.com/mapfiles/kml/shapes/placemark_circle.png'
        },

        "layers" : {
          "track-line" : {
            "filter" : ['all', ['==', '#type', 'line'], ["!=", "#id", "track-to-hill"]],
            "line": true,
            "line-width" : 4,
            "line-color": [255,0,255,255],
            "zbuffer-offset" : [-0.5,0,0],
            "z-index" : -1
          },

          "track-extension" : {
            "filter" : ['all', ['==', '#type', 'line'], ["==", "#id", "track-to-hill"]],
            "line": true,
            "line-width" : 4,
            "line-color": [255,0,0,255],
            "zbuffer-offset" : [-0.5,0,0],
            "z-index" : -1
          },

          "track-shadow" : {
            "filter" : ["==", "#type", "line"],
            "line": true,
            "line-width" : 20,
            "line-color": [0,0,0,120],
            "zbuffer-offset" : [-7,0,0],
            "hover-event" : true,
            "advanced-hit" : true
          },

          "place" : {
            "filter": ["all", ["==", "#type", "point"], ["!=", "#id", "hill-top"]],
            'icon': true,
            'icon-source': '@icon-marker',
            'icon-color': [0,255,0,255],
            'icon-scale': 2,
            'icon-origin': 'center-center',

            "label": true,
            "label-size": 19,
            "label-source": "$title",
            "label-offset": [0,-20],

            "zbuffer-offset" : [-8,0,0]
          },

          "place-hill": {
            "inherit": "place",
            "filter": ["all", ["==", "#type", "point"], ["==", "#id", "hill-top"]],
            "icon-color": [255,0,0,255]
          }

        }
      };

      //make free layer
      var freeLayer = geodata.makeFreeLayer(style);

      //add free layer to the map
      map.addFreeLayer('geodatatest', freeLayer);

      //add free layer to the list of free layers
      //which will be rendered on the map
      var view = map.getView();
      view.freeLayers.geodatatest = {};
      map.setView(view);
    }


    let thing = 0;
    let tick = 0;




    function onCustomRender() {


      if (true ) { //check whether texture is loaded
//console.log(thing);
        //we have line points in navigation coordinates
        //so we need to convert them to canvas coordinates
        //because funtions drawImage and drawLineString
        //work in canvas space

        const smaller = linePoints.slice(0, Math.ceil(thing));

        var points = new Array(smaller.length);

        for (var i = 0; i < smaller.length; i++) {
          points[i] = map.convertCoordsFromNavToCanvas(smaller[i], 'float');
        }

        var speed = 0.4;

        thing+=speed;


//setProfilePointer(linePoints[0]);
        if (true) {

//console.log(houseModel.ready);

          //draw models when all model resources are ready
          if (pinModel && pinModel.ready && pinModelSelected && pinModelSelected.ready) {

            //console.log("housemodel");
            //console.log(houseModel);

         /*   // pinModel.draw({
            //   navCoords: [linePoints[0][0], linePoints[0][1], linePoints[0][2] + 50],
            //   heightMode: 'float',
            //   rotation: [0, 0, 0],
            //   scale: [18, 18, 18],
            //   ambientLight: [90,90,90]
            // })
*/


            pinModel.draw({
              navCoords: [linePoints[0][0], linePoints[0][1], linePoints[0][2] + 50],
              heightMode: 'float',
              rotation: [0, 0, 0],
              scale: [18, 18, 18],
              ambientLight: [90, 90, 90]
            })


            pinModelSelected.draw({
              navCoords: linePoints[6],
              heightMode: 'float',
              rotation: [0,0,0],
              scale: [18, 18, 18],
              ambientLight: [90,90,90]
            })




            pinModel.draw({
              navCoords: linePoints[13],
              heightMode: 'float',
              rotation: [0,0,0],
              scale: [18, 18, 18],
              ambientLight: [90,90,90]
            })

          }








          // console.log(distancePointer);

        }
        //get canvas postion of the track point


        //draw line
        if (true) renderer.drawLineString({
          points : points,
          size : 2.0,
          color : [0,0,255,255],
          depthTest : true,
          depthOffset : [-0.01,0,0],
          blend : true
        });

      }
    }


    function onTick() {
      if (true && map) { //check whether texture is loaded
//console.log(tick, tick % 20);
        //pathDistance += pathLength / (60 * 3);
        //pathDistance = pathDistance % pathLength;
//map.redraw();
        tick++;

      }
    }


  }

  render() {
    const {loading, form} = this.props;

    return (
      <div>
        <div id="map-div" style={{width:'100%', height:'100%'}}>
        </div>
      </div>
    );
  }
}
