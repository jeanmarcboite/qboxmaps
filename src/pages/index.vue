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
import Vue from 'vue'
import {
  sync
} from 'vuex-pathify'
import Geocoder from 'ol-geocoder'

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
    listLayers(this.$map).forEach(function (layer) {
      layer.setVisible(self.visible[layer.get('title')])
    })
    const geocoder = new Geocoder('nominatim', {
      provider: 'osm',
      key: '__some_key__',
      lang: 'en-US', // en-US, fr-FR
      placeholder: 'Search for ...',
      targetType: 'text-input',
      limit: 5,
      autoComplete: true,
      keepOpen: false,
      preventDefault: true,
    })
    this.$map.addControl(geocoder)
    geocoder.on('addresschosen', function (evt) {
      console.log(evt.feature)
      console.log(evt.coordinate + ' ' + evt.address)
      console.info(evt)
    })
  }
}
</script>
<style lang="stylus">
@import "~ol/ol.css";
@import "~ol-geocoder/dist/ol-geocoder.min.css";
.ol-geocoder.gcd-gl-container
.ol-geocoder .gcd-txt-control
      position: relative
      width: 100%
      height: 2.375em
      border: 1px solid #ccc
      background-color: #fff
      overflow: hidden

</style>
