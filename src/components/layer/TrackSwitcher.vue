<template>
<div class="ol-unselectable ol-control ol-trackswitcher">
  <q-context-menu>
    <b>Tracks</b>
    <TrackList ref='trackList' />
  </q-context-menu>
  <input type="file" :id="id" accept=".gpx" multiple style="display: none;" />
  <q-btn push small round @click="handleClick">
    <q-icon name="directions_walk" style="font-size: 1em;" />
  </q-btn>
</div>
</template>

<script>
import TrackList from './TrackList.vue'
import readFiles from 'src/ol/layer/readfiles'

import {
  sync
} from 'vuex-pathify'

export default {
  components: {
    TrackList
  },
  computed: {
    ...sync('UI', ['trackList']),
  },
  props: ['tracks'],
  data: function () {
    return {
      id: 'TrackSwitcher/inputID'
    }
  },
  mounted: function () {
    this.trackList = this.$refs.trackList
    document.getElementById(this.id).onchange = readFiles({
      map: this.$ol.map,
      tracks: this.$ol.tracks,
      store: this.$store,
      notify: this.$q.notify
    })
  },
  methods: {
    handleClick() {
      const el = document.getElementById(this.id)
      if (el) {
        el.click()
      }
    }
  }
}
</script>

<style lang="stylus">
</style>
