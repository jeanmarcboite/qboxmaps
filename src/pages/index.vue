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
  }
}
</script>
<style lang="stylus">
@import "~ol/ol.css";
</style>
