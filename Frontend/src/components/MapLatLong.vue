<template>
    <div :id="'map'+this.device"  class="mx-1 mapContainer"></div>
</template>

<script>
//import mapState from "vuex"
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Icon } from 'leaflet';
import { config } from '@/config.js'

export default {
  name: "MapLatLong",
  props: ['lat', 'long', 'device'],
  data() {
    return {
        center: [51.209348, 3.2246995],
        data: [],
        map: null,
        loaded: false,
        markerarray: [],
        pin: null
    };
  },
  methods: {
    setupLeafletMap () {
      this.map = L.map(`map${this.device}`, {dragging: false, scrollWheelZoom: "center",}).setView([this.lat, this.long], 14);
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          maxZoom: 18,
          id: "mapbox/streets-v11",
          accessToken: config.VUE_APP_MAPBOX_TOKEN,
        }
      ).addTo(this.map);

      delete Icon.Default.prototype._getIconUrl;
      Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      });

        this.pin = L.marker([this.lat, this.long])
        this.pin.addTo(this.map);

        this.map._handlers.forEach(function(handler) {
        handler.disable();
        });     
    },
  },
  mounted() {
    this.setupLeafletMap()
  },
};
</script>

<style>
.mapContainer {
  height: 20vh;
  z-index: 0;
}
</style>