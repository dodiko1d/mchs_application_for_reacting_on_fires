// Vue import.
import Vue from 'vue'

// Main app import.
import App from './App.vue'

// Plugins import.
import {
  BootstrapVue,
  IconsPlugin,
  BootstrapVueIcons,
  LayoutPlugin
} from 'bootstrap-vue'

import './assets/sass/vue-bootstrap.sass'

// Vue modules adding to entry point ("main.js").
[BootstrapVue, IconsPlugin, BootstrapVueIcons, LayoutPlugin]
  .forEach(plugin => Vue.use(plugin));

import 'leaflet/dist/leaflet.css';


// Vue components integration.
import './assets/js/componentsImport.js';


// App's rendering for "index.html".
new Vue({
  el: '#app',
  render: h => h(App)
});
