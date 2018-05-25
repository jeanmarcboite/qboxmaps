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
import Geocoder from 'ol-geocoder'

import store from 'src/store'
import layers from 'src/ol/layers/sources'
import controls from 'src/ol/controls'
import listLayers from 'src/ol/layers/list'
import {
  poi
} from 'src/ol/poi'

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
    listLayers(this.$map).forEach(function (layer) {
      layer.setVisible(self.visible[layer.get('title')])
    })
    const geocoder = new Geocoder('nominatim', {
      provider: 'osm',
      key: '__some_key__',
      lang: 'en-US', // en-US, fr-FR
      placeholder: 'Search for ...',
      targetType: 'glass-button',
      limit: 5,
      autoComplete: true,
      keepOpen: false,
      preventDefault: true,
    })

    this.$map.addControl(geocoder)
    geocoder.on('addresschosen', function (evt) {
      self.$map.getView().setCenter(evt.coordinate)
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

    if ('geolocation' in navigator) {
      console.log('/* geolocation is available */')
      // One-shot position request.
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log('Pos: ' + position.coords.longitude)
        console.log('Pos: ' + position.coords.latitude)
        self.$map.getView().setCenter(poi(position.coords.longitude, position.coords.latitude))
        // self.$map.getView().setCenter(poi(1.987147, 44.565865))
      })
    } else {
      console.log('/* geolocation is NOT available */')
    }
  }
}
</script>
<style lang="stylus">
@import "~ol/ol.css";
@import "../css/ol-geocoder.css";
.ol-overviewmap
  bottom: 2em
</style>
