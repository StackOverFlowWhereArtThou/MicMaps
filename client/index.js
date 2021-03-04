import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import './styles.scss';

import Map from "@arcgis/core/Map";
import MapView from '@arcgis/core/views/MapView'

import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

import Search from '@arcgis/core/widgets/Search';

import esriConfig from '@arcgis/core/config';

import FormTemplate from '@arcgis/core/form/FormTemplate';
import FeatureForm from '@arcgis/core/widgets/FeatureForm'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

esriConfig.apiKey = "AAPK8e0c4cb7f5734144aa2d85268219fe7183Y2n2bQ0imhF6a1zMG9z6wMNJyrGaOyLzTxDWyXiotnzo4Ak7HngSGNreDkWErV";


const myMap = new Map({   
  basemap: "arcgis-navigation"             // Create a Map object
  // basemap: "streets-vector",
  // basemap: "arcgis-topographic"
  // layers: additionalLayers             // Optionally, add additional layers collection
});

const mapView = new MapView({          // The View for the Map object
  map: myMap,
  center: [-118.805, 34.027], // LA
  // center: [-122.3321,47.6062], // Seattle
      zoom: 12,
  container: "viewDiv"
});

const search = new Search({  //Add Search widget
  view: mapView
});

mapView.ui.add(search, "top-right");

const graphicsLayer = new GraphicsLayer();
      myMap.add(graphicsLayer);

      const point = { //Create a point
        type: "point",
        longitude: -118.80657463861,
        latitude: 34.0005930608889
      };

      const point2 = { //Create a point
        type: "point",
        longitude: -118.9,
        latitude: 34.1
      };
      const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],  // Orange
        outline: {
          color: [255, 255, 255], // White
          width: 1
        }
      };

      const pointArr = [point, point2];

      for(let i = 0; i < pointArr.length; i++){
      let pointGraphic = new Graphic({
        geometry: pointArr[i],
        symbol: simpleMarkerSymbol,
        // attributes: attributes,
        // popupTemplate: popupTemplate

      });
      graphicsLayer.add(pointGraphic);
    }

    const popupTemplate = {
      title: "{Name}",
      content: "{Description}"
   }
   const attributes = {
      Name: "Graphic",
      Description: "I am a polygon"
   }

