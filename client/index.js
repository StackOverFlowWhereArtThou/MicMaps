import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import './styles.scss';

const Event = require("../server/models/eventModel.js");


import Map from "@arcgis/core/Map";
import MapView from '@arcgis/core/views/MapView'

import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

import Search from '@arcgis/core/widgets/Search';

import esriConfig from '@arcgis/core/config';

import FormTemplate from '@arcgis/core/form/FormTemplate';
import FeatureForm from '@arcgis/core/widgets/FeatureForm'

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

let pointData;
fetch("/data")
  .then(res => res.json())
  .then(
    (result) => {
      console.log('result\n', result);
      console.log('result length', result.length);
      pointData = result;
      console.log('pointData\n', pointData)
      console.log('pointData length', pointData.length)

    },
  )
  .then(() => {
    esriConfig.apiKey = "AAPK8e0c4cb7f5734144aa2d85268219fe7183Y2n2bQ0imhF6a1zMG9z6wMNJyrGaOyLzTxDWyXiotnzo4Ak7HngSGNreDkWErV";


    const myMap = new Map({
      basemap: "arcgis-navigation", // Create a Map object
      // basemap: "streets-vector",
      // basemap: "arcgis-topographic"
      // layers: additionalLayers             // Optionally, add additional layers collection
    });

    const mapView = new MapView({ // The View for the Map object
      map: myMap,
      // center: [-118.805, 34.027], // LA
      // center: [-122.3321,47.6062], // Seattle
      center: [-87.6298, 41.8781], // Chicago
      zoom: 10,
      container: "viewDiv"
    });

    // Can add a search bar with this code
    const search = new Search({  //Add Search widget
      view: mapView
    });

    mapView.ui.add(search, "top-right");

    const graphicsLayer = new GraphicsLayer();
    myMap.add(graphicsLayer);

    // put points on the map with data
    for (let i = 0; i < pointData.length; i++) {
      let typeColor;
      if (pointData[i].type === 'openMic') {
        typeColor = [226, 119, 40] // Orange
      } else if (pointData[i].type === 'showcase') {
        typeColor = [128, 0, 128] // Purple 
      } else {
        typeColor = [128, 128, 128] // Gray
      };

      let simpleMarkerSymbol = {
        type: "simple-marker",
        color: typeColor,  // Orange
        outline: {
          color: [255, 255, 255], // White
          width: 1
        }
      };

      let popupTemplate = {
        title: "{Type} - {Name}",
        content: "<strong>Details</strong><ul><li>Address: {Address}</li><li>Start Time: {StartTime}</li><li>Day: {DayOfWeek}</li></ul>"
      }
      let attributes = {
        Name: pointData[i].eventName,
        Type: (pointData[i].type === "openMic") ? "Open Mic" : (pointData[i].type === "showcase") ? "Showcase" : "Other Comedy Event",
        Address: pointData[i].address,
        StartTime: pointData[i].startTime,
        DayOfWeek: pointData[i].dayOfWeek,
      }


      let pointGraphic = new Graphic({
        geometry: { //Create a point
          type: "point",
          longitude: pointData[i].long,
          latitude: pointData[i].lat,
        },
        symbol: simpleMarkerSymbol,
        attributes: attributes,
        popupTemplate: popupTemplate

      });
      graphicsLayer.add(pointGraphic);
    }

  });
