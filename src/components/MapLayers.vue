<template>
<div></div>
</template>

<script>
import Group from 'ol/layer/group'
import layers from 'src/ol/layer/sources'

export default {
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
  }
}
</script>

<style>

</style>
