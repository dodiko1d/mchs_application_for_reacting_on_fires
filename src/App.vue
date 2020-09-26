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
      <l-marker :lat-lng="center">
        <l-popup><h4>Пожар</h4>Данные<br><br><button class="bg-warning">hello</button></l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng, latLngBounds, icon } from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  data() {
    return {
      zoom: 7,
      center: latLngBounds(latLng(53.775, 85.206), latLng(57.172, 74.816)).getCenter(),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',

      currentZoom: 11.5,
      currentCenter: latLngBounds(latLng(53.775, 85.206), latLng(57.172, 74.816)).getCenter(),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
        minZoom: 7,
        maxBounds: latLngBounds(latLng(53.775, 85.206), latLng(57.172, 74.816))
      },
      showMap: true,
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
  }
};
</script>

<style lang="sass">
.map-container
  height: 100vh
  width: 100vw

.fire-map
  height: 100%
</style>
