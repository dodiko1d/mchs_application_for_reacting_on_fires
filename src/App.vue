<template>
  <div class="map-container">
    <l-map
      ref="myMap"
      class="fire-map"
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-circle-marker v-if="!detailsAsked" v-for="fire in fires" :lat-lng="fire.coordinates" :color="'red'" :keepInView="'true'">
        <l-popup>
          <div class="map__popup__content-container" @click="showDetails(fire)">
          <h4>Данные:</h4>
          <b-row cols="12">
          <b-col class="map__popup__property-container" v-for="property in Object.keys(fire)" cols="6">
            <div class="map__popup__property-name">{{ propertiesText[property] }}</div>
            <div class="map__popup__property-value">{{ fire[property] }}</div>
          </b-col>
          </b-row>
          </div>
        </l-popup>
      </l-circle-marker>
      <Details :fire="currentFire" :detailsAsked="detailsAsked" id="details__container" :changeDetailsAsked="changeDetailsAsked"/>
    </l-map>
  </div>
</template>

<script>
import { latLng, latLngBounds } from 'leaflet';
import Details from "@/vue-components/Details";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip, LCircleMarker } from 'vue2-leaflet';
import axios from 'axios';
import fires from './assets/js/fires';
import propertiesText from './assets/js/propertiesText';


let northEastCornerCoordinates = latLng(59.042, 73.31);
let southWestCornerCoordinates = latLng(51, 87.337);

export default {
  name: "Example",
  components: {
    Details,
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LCircleMarker,
  },
  data() {
    return {
      zoom: 7,
      center: latLngBounds(northEastCornerCoordinates, southWestCornerCoordinates).getCenter(),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',

      currentZoom: 11.5,
      currentCenter: latLngBounds(northEastCornerCoordinates, southWestCornerCoordinates).getCenter(),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
        minZoom: 7,
        maxBounds: latLngBounds(northEastCornerCoordinates, southWestCornerCoordinates)
      },
      showMap: true,
      fires: fires,
      propertiesText: propertiesText,
      currentFire: fires[0],
      detailsAsked: false,
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    changeDetailsAsked() {
      this.detailsAsked = !this.detailsAsked;
    },
    showDetails(fire) {
      this.currentFire = fire;
      this.changeDetailsAsked();
    },
  },
  mounted() {
    axios
      .get('')
      .then(response => (this.info = response));
  }
};
</script>

<style lang="sass">
.map-container
  height: 100vh
  width: 100vw

.fire-map
  height: 100%

.leaflet-popup-content-wrapper
  width: 300px

.map__popup__property-container
  margin-bottom: 0.5em

.map__popup__content-container
  width: 100%
  height: 100%
</style>
