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

import layers from 'src/assets/layers'
import POI from 'src/assets/poi'
import controls from '../assets/controls'
export default {
  name: 'Map',
  computed: {
    ...sync('view', ['zoom', 'center'])
  },
  mounted: function () {
    Vue.prototype.$map = new Map({
      layers,
      controls,
      target: 'map',
      view: new View({
        center: POI.Faycelles,
        zoom: 14
      })
    })
  }
}
</script>
<style lang="stylus">
@import "~ol/ol.css";
</style>
