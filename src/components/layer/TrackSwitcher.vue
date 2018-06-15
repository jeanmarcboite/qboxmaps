<template>

<div class="ol-unselectable ol-control ol-trackswitcher" @contextmenu="updateTrackList($event)">
  <q-context-menu>
    <b>Tracks</b>
    <TrackList ref='trackList' @update="updateTrackList"/>
  </q-context-menu>
  <input type="file" ref="input" accept=".gpx" multiple style="display: none;" />
  <q-btn push small round @click="handleClick">
    <q-icon name="directions_walk" style="font-size: 1em;" />
  </q-btn>
</div>
</template>

<script>
import TrackList from './TrackList.vue'
import readFiles from 'src/ol/layer/readfiles'

export default {
  components: {
    TrackList
  },
  computed: {},
  props: ['tracks'],
  data: function() {
    return {
      id: 'TrackSwitcher/inputID',
    }
  },
  mounted: function() {
    this.$refs.input.onchange = readFiles({
      map: this.$ol.map,
      tracks: this.$ol.tracks,
      store: this.$store,
      notify: this.$q.notify
    })
  },
  methods: {
    handleClick() {
      this.$refs.input.click()
    },
    updateTrackList() {
      this.$refs.trackList.$forceUpdate()
    },
  }
}
</script>

<style lang="stylus">
</style>
