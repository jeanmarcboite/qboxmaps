<template>
<q-page class="flex flex-center">
  <Map/>
  <MapView/>
  <MapLayers/>
  <MapControls/>
</q-page>
</template>

<style>

</style>

<script>
import OlMap from 'ol/map'
import Geolocation from 'ol/geolocation'
import Vue from 'vue'
import Map from 'src/components/Map'
import MapView from 'src/components/MapView'
import MapLayers from 'src/components/MapLayers'
import MapControls from 'src/components/MapControls'
import {
  sync
} from 'vuex-pathify'

import store from 'src/store'

export default {
  name: 'App',
  components: {
    Map,
    MapView,
    MapLayers,
    MapControls
  },
  wmounted: function () {
    const self = this
    window.map = Vue.prototype.$map

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
