<template>

<div class="ol-unselectable ol-control ol-trackswitcher" @contextmenu="updateTrackList($event)">
  <q-context-menu>
    <div>
    <q-btn>Tracks</q-btn>
         <q-btn push round color="amber" text-color="black" @click="ondelete">
   <q-icon name="delete" />
  </q-btn>
  </div>
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

import {
  sync
} from 'vuex-pathify'

export default {
  components: {
    TrackList
  },
  computed: {
    ...sync('OL', ['map'])
  },
  props: ['tracks'],
  data: function() {
    return {
      id: 'TrackSwitcher/inputID',
    }
  },
  mounted: function() {
    console.log('TrackSwitcher mounted')
    this.$refs.input.onchange = readFiles({
      map: this.map,
      tracks: this.map.tracks,
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
    ondelete() {
      this.$q.notify({
        message: 'Delete all tracks?',
        type: 'negative',
        timeout: 0,
        position: 'right',
        actions: [
          {
            label: 'Cancel',
          },
          {
            label: 'Delete all',
            handler: () => {
              this.map.tracks.clear()
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="stylus">
</style>
