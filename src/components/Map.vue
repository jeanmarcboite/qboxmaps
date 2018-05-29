<template>
<div id="map" class="ol-map" />
</template>

<script>
export default {
  name: 'Map',
  data() {
    return {}
  },
  mounted: function () {
    console.log('map mounted')
  }
}
</script>

<style lang="stylus">
.ol-map
  position: fixed
  width: 100%
  height: 100%
</style>
