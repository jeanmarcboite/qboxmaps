<template>
<div id="map" class="ol-map">
  <slot/>
</div>
</template>

<script>
import Vue from 'vue'
import OlMap from 'ol/map'

export default {
  name: 'Map',
  data() {
    return {}
  },
  mounted: function () {
    console.log('create map')
    const map = new OlMap({
      target: 'map',
    })
    Vue.prototype.$map = map
    window.map = map
  }
}
</script>

<style lang="stylus">
.ol-map
  position: fixed
  width: 100%
  height: 100%
</style>
