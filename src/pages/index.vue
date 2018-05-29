<template>
<q-page class="flex flex-center">
  <Map></Map>
</q-page>
</template>

<style>

</style>

<script>
import OlMap from 'ol/map'
import View from 'ol/view'
import Geolocation from 'ol/geolocation'
import Vue from 'vue'
import Map from '../components/Map'
import {
  sync
} from 'vuex-pathify'

import store from 'src/store'
import layers from 'src/ol/layers/sources'
import controls from 'src/ol/controls'
import listLayers from 'src/ol/layers/list'

export default {
  name: 'App',
  components: {
    Map
  },
  computed: {
    ...sync('view', ['zoom', 'center', 'trackColor']),
    ...sync('layers', ['visible'])
  },
  mounted: function () {
    const self = this
    console.log('create map')
    Vue.prototype.$map = new OlMap({
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
@import "../css/ol-trackswitcher.css";
@import "~ol-layerswitcher/src/ol-layerswitcher.css";
.ol-overviewmap
  bottom: 2em
.ol-geolocator
  top: 7em
  left: 0.5em
.ol-trackswitcher
  top: 8.5em
  left: 0.5em
#v
  position: absolute
  top: 14.5em
  left: 1.5em
  display: flex
  flex-direction: column
#qbtn
  position: absolute
  top: 12.5em
  left: 1.5em
  size: xs
#qbtngroup
  position: absolute
  top: 1.5em
  right: 25em

</style>
