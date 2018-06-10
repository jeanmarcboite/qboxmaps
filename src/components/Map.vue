<template>
<div id="map" class="ol-map">
  <slot/>
</div>
</template>

<script>
import View from 'ol/view'
import Group from 'ol/layer/group'
import OlMap from 'ol/map'
import interaction from 'ol/interaction'
import dragAndDropInteraction from 'src/ol/interaction/dnd'
import layers from 'src/ol/layer/sources'
import addTracks from 'src/ol/layer/addtracks'
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
    this.$ol.tracks = new Group({
      title: 'Tracks',
      visible: true,
      layers: [],
      type: 'track',
      openInLayerSwitcher: true
    })
    addTracks(this.$ol.tracks, this.$store.state.tracks.tracks)
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
      self.$store.commit('UI/closeDrawer')
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
