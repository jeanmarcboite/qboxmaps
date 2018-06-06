<template>
<div id="map" class="ol-map" @onclick="onclick">
  <slot/>
</div>
</template>

<script>
import Vue from 'vue'
import OlMap from 'ol/map'
import store from 'src/store'
import interaction from 'ol/interaction'
import dragAndDropInteraction from 'src/ol/interaction/dnd'
import {
  sync
} from 'vuex-pathify'

export default {
  name: 'Map',
  data() {
    return {}
  },
  computed: {
    ...sync('UI', ['layerSwitcherOpen']),
  },
  methods: {
    onclick: function () {}
  },
  mounted: function () {
    const self = this
    const map = new OlMap({
      target: 'map',
      interactions: interaction.defaults().extend([dragAndDropInteraction]),
    })
    Vue.prototype.$map = map
    window.map = map
    map.on('click', function (event) {
      self.layerSwitcherOpen = false
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
