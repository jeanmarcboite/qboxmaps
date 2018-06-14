<template>
<div id="map" class="ol-map">
  <slot/>
</div>
</template>

<script>
import View from 'ol/view'
import TrackGroup from 'src/ol/layer/TrackGroup'
import OlMap from 'ol/map'
import interaction from 'ol/interaction'
import dragAndDropInteraction from 'src/ol/interaction/dnd'
import layers from 'src/ol/layer/sources'
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
    ...sync('view', ['zoom', 'center']),
  },
  methods: {},
  created: function () {
    const self = this
    this.$ol.tracks = new TrackGroup({
      openInLayerSwitcher: true
    })
    this.$ol.tracks.addTracks(this.$store.state.tracks.tracks)
    layers.push(this.$ol.tracks)
    this.$ol.map = new OlMap({
      layers,
      interactions: interaction.defaults().extend([dragAndDropInteraction]),
      view: new View({
        center: this.center,
        zoom: this.zoom
      }),
    })
    this.$ol.map.on('click', function (event) {
      self.layerSwitcherOpen = false
    })
  },
  mounted: function () {
    this.$ol.map.setTarget('map')
  }
}
</script>

<style lang="stylus">
.ol-map
  position: fixed
  width: 100%
  height: 100%
</style>
