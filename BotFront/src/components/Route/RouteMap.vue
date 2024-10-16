<script>
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import ZoomControl from '@mapbox-controls/zoom';
import '@mapbox-controls/zoom/src/index.css';
import CompassControl from '@mapbox-controls/compass';
import '@mapbox-controls/compass/src/index.css';
import depImage from "../../assets/dep.png";
import appImage from "../../assets/app.png";

export default {
  name: "RouteMap",
  props: {
    data: Object,
    dep: null,
    app: null
  },
  data() {
    return {
      map: null,
    }
  },
  methods: {
    createMap() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VvYXI3c2J2ZCIsImEiOiJjbHAzeHNxNTgxM2VsMnJxeW8wMmw3YTVrIn0.sRsF6Vxg3yAZcM0mQTM_Ww';

      const routeCenter = this.getRouteCenter();

      this.map = new mapboxgl.Map({
        container: this.$refs.mapContainer,
        style: 'mapbox://styles/guoar7sbvd/cm19cttzy02c401qual874y3q',
        center: routeCenter,
        zoom: 3,
        useWebGL2: true
      });

      this.map.addControl(new ZoomControl(), 'bottom-right');
      this.map.addControl(new CompassControl(), 'bottom-right');

      this.addAirportMarkers();
      this.drawRoute();
    },

    addAirportMarkers() {
      const airports = this.getAirports();

      const depIcon = document.createElement('img');
      depIcon.src = depImage;
      depIcon.style.width = '30px';
      depIcon.style.height = '30px';

      new mapboxgl.Marker({element: depIcon})
          .setLngLat([airports.takeoff.lonx, airports.takeoff.laty])
          .setPopup(new mapboxgl.Popup().setText(`Takeoff: ${airports.takeoff.name}`))
          .addTo(this.map);

      const appIcon = document.createElement('img');
      appIcon.src = appImage;
      appIcon.style.width = '30px';
      appIcon.style.height = '30px';

      new mapboxgl.Marker({element: appIcon})
          .setLngLat([airports.landing.lonx, airports.landing.laty])
          .setPopup(new mapboxgl.Popup().setText(`Landing: ${airports.landing.name}`))
          .addTo(this.map);
    },

    getAirports() {
      return {
        takeoff: this.data.airports[`${this.dep}`],
        landing: this.data.airports[`${this.app}`]
      };
    },

    drawRoute() {
      const routeCoordinates = this.getRouteCoordinates();

      this.map.on('load', () => {
        this.map.addSource('route', {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'LineString',
              'coordinates': routeCoordinates
            }
          }
        });

        this.map.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#125da3',
            'line-width': 6
          }
        });
      });
    },


    getRouteCoordinates() {
      return Object.keys(this.data.coordinate).map(key => {
        const coord = this.data.coordinate[key];
        return [coord.lonx, coord.laty];
      });
    },


    getRouteCenter() {
      const coordinates = this.getRouteCoordinates();

      let totalLon = 0;
      let totalLat = 0;

      coordinates.forEach(coord => {
        totalLon += coord[0];
        totalLat += coord[1];
      });

      const avgLon = totalLon / coordinates.length;
      const avgLat = totalLat / coordinates.length;

      return [avgLon, avgLat];
    }
  },
  mounted() {
    this.createMap();
  }
}
</script>

<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 40vh;
  border-radius: 20px;
}
</style>
