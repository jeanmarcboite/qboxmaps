<template>
<div id="map" class="ol-map">
  <slot/>
</div>
</template>

<script>
import Vue from 'vue'
import OlMap from 'ol/map'
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
  methods: {},
  mounted: function () {
    const self = this
    const map = new OlMap({
      target: 'map',
      interactions: interaction.defaults().extend([dragAndDropInteraction]),
    })
    Vue.prototype.$map = map
    window.map = map
    map.on('click', function (event) {
      self.$store.commit('UI/closeDrawer')
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
