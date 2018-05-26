<template>
<q-page class="flex flex-center">
  <div id="map" class="ol-map" style="position: fixed; width: 100%; height: 100%;" />
</q-page>
</template>

<style>

</style>

<script>
import Map from 'ol/map'
import View from 'ol/view'
import Geolocation from 'ol/geolocation'
import Vue from 'vue'
import {
  sync
} from 'vuex-pathify'

import store from 'src/store'
import layers from 'src/ol/layers/sources'
import controls from 'src/ol/controls'
import listLayers from 'src/ol/layers/list'

export default {
  name: 'Map',
  computed: {
    ...sync('view', ['zoom', 'center', 'trackColor']),
    ...sync('layers', ['visible'])
  },
  mounted: function () {
    const self = this
    Vue.prototype.$map = new Map({
      layers,
      controls,
      target: 'map',
      view: new View({
        center: this.center,
        zoom: this.zoom
      })
    })
    window.map = Vue.prototype.$map
    listLayers(this.$map).forEach(function (layer) {
      layer.setVisible(self.visible[layer.get('title')])
    })
    this.$map.on('moveend', function (event) {
      store.commit('view/setView', {
        zoom: event.map.getView().getZoom(),
        center: event.map.getView().getCenter()
      })
    })

    if (this.geoLocate) {
      var geolocation = new Geolocation({
        projection: self.$map.getView().getProjection()
      })

      geolocation.on('change:position', function () {
        var coordinates = geolocation.getPosition()
        // self.$map.getView().setCenter(coordinates)
        console.log(coordinates)
        geolocation.setTracking(false)
      })
      // geolocation.setTracking(true)
    }
  }
}
</script>

<style lang="stylus">
@import "~ol/ol.css";
@import "../css/ol-geocoder.css";
@import "~ol-layerswitcher/src/ol-layerswitcher.css";
.ol-overviewmap
  bottom: 2em
.ol-geolocator
  top: 7em
  left: 0.5em
</style>
