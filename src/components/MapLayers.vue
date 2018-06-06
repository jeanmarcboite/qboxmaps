<template>
<div>
</div>
</template>

<script>
import Group from 'ol/layer/group'
import layers from 'src/ol/layer/sources'
import TrackLoader from './layer/TrackLoader'
import addTracks from 'src/ol/layer/addtracks'
export default {
  components: {
    TrackLoader
  },
  data() {
    return {
      layers
    }
  },
  mounted: function () {
    this.$map.$tracks = new Group({
      title: 'Tracks',
      visible: true,
      layers: [],
      openInLayerSwitcher: true
    })
    layers.push(this.$map.$tracks)
    this.$map.getLayers().extend(layers)
    addTracks(this.$map, this.$store.state.tracks.tracks)
  }
}
</script>

<style>

</style>
