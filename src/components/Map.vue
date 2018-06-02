<template>
<div id="map" class="ol-map" @onclick="onclick">
  <slot/>
</div>
</template>

<script>
import Vue from 'vue'
import OlMap from 'ol/map'
import store from 'src/store'

export default {
  name: 'Map',
  data() {
    return {}
  },
  methods: {
    onclick: function () {
      console.log('click map')
    }
  },
  mounted: function () {
    console.log('create map')
    const map = new OlMap({
      target: 'map',
    })
    Vue.prototype.$map = map
    window.map = map
    map.on('click', function (event) {
      store.commit('UI/closeDrawer')
    })
  }
}
</script>

<style lang="stylus">
.ol-map
  position: fixed
  width: 100%
  height: 100%
</style>
