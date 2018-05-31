<template>
<div></div>
</template>

<script>
import layers from 'src/ol/layers/sources'
export default {
  data() {
    return {
      layers
    }
  },
  mounted: function () {
    console.log('add layers')
    this.$map.getLayers().extend(layers)
  }
}
</script>

<style>

</style>
