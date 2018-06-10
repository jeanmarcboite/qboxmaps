<template>
<q-list highlight inset-separator>
  <Track v-for="(track, key) in tracks" :key="key" :track="track" />
</q-list>
</template>

<script>
import Track from './Track.vue'
export default {
  components: {
    Track
  },
  computed: {
    tracks: function () {
      console.log('get tracks')
      return this.$ol.tracks.getLayers().getArray()
    },
  },
}
</script>
