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
import Tile from 'ol/layer/tile'
import BingMaps from 'ol/source/bingmaps'

import layers from 'src/assets/layers'
const key = 'At70LhIzqlj9R8t_QNprh9scHr6d-6MrPeqtim9vsvKHnEJC4fJzDRsaxgSDwL0i'

export default {
  name: 'Map',
  computed: {
    ...sync('view', ['zoom', 'center'])
  },
  mounted: function () {
    Vue.prototype.$map = new Map({
      layers: [
        new Tile({
          source: new BingMaps({
            key,
            imagerySet: 'Aerial'
          })
        })
      ],
      target: 'map',
      view: new View({
        center: [-9101767, 2822912],
        zoom: 14
      })
    })
  }
}
</script>
<style scoped lang="stylus">
ol-map
  position fixed
  height 100%
  width 100%
</style>
