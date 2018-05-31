<template>
<div id="map" class="ol-map">
  <slot/>
</div>
</template>

<script>
import Vue from 'vue'
import OlMap from 'ol/map'
import View from 'ol/view'
import layers from 'src/ol/layers/sources'
import {
  sync
} from 'vuex-pathify'

export default {
  name: 'Map',
  data() {
    return {}
  },
  computed: {
    ...sync('view', ['zoom', 'center', 'trackColor']),
  },
  mounted: function () {
    console.log('create map')
    const map = new OlMap({
      target: 'map',
    })
    Vue.prototype.$map = map
  }
}
</script>

<style lang="stylus">
.ol-map
  position: fixed
  width: 100%
  height: 100%
</style>
