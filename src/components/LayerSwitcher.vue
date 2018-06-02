<template>
<div class="ol-unselectable ol-control ol-layerswitcher">
  <q-btn icon="map" push small rounded @click="handleClick" />
</div>
</template>
<script>
import {
  sync
} from 'vuex-pathify'

export default {
  computed: {
    ...sync('UI', ['layerSwitcherOpen']),
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      console.log('layerSwitcher')
      this.layerSwitcherOpen = !this.layerSwitcherOpen
    },
  }
}
</script>

<style lang="stylus">
.ol-layerswitcher
    position: absolute
    top: 0.5em
    right: 3.5em
    text-align: left
</style>
