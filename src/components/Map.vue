<template>
<div id="map" class="ol-map">
  <slot/>
</div>
</template>

<script>
import {
  sync
} from 'vuex-pathify'

export default {
  name: 'Map',
  props: {
    'target': {
      default: 'map',
      type: String
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...sync('UI', ['layerSwitcherOpen']),
    ...sync('view', ['zoom', 'center']),
    ...sync('OL', ['map'])
  },
  methods: {},
  created: function () {
    this.$store.commit('OL/newMap', { 
      target: 'map',
      tracks: this.$store.state.tracks.tracks
    })
  },
  mounted: function () {
    // this.map.setTarget('map')
   this.$store.commit('OL/setTarget', this)
  }
}
</script>

<style lang="stylus">
.ol-map {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
