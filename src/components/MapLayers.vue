<template>
<div></div>
</template>

<script>
import Group from 'ol/layer/group'
import layers from 'src/ol/layers/sources'

export default {
  data() {
    return {
      layers
    }
  },
  mounted: function () {
    this.$map.getLayers().extend(layers)
    console.log('add layers')
    this.$map.$tracks = new Group({
      title: 'Tracks',
      visible: true,
      openInLayerSwitcher: true
    })
    this.$map.addLayer(this.$map.$tracks)
  }
}
</script>

<style>

</style>
