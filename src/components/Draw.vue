<template>
<div class="ol-unselectable ol-control ol-drawbutton">
  <q-btn push small round @click="handleClick">
    <q-icon name="timeline" style="font-size: 1em;" v-if="!drawing" />
    <q-icon name="touch_app" style="font-size: 1em;" v-if="drawing" />
  </q-btn>
</div>
</template>
<script>
import Draw from 'ol/interaction/draw'
import VectorSource from 'ol/source/vector'
import TrackLayer from 'src/ol/layer/Track'
import store from 'src/store'

import {
  sync
} from 'vuex-pathify'
export default {
  components: {},
  computed: {
    ...sync('tracks', ['tagList']),
  },
  data: function () {
    return {
      drawing: false
    }
  },
  methods: {
    handleClick: function () {
      this.drawing = !this.drawing
      if (this.drawing) {
        console.log('startDraw')

        var source = new VectorSource({
          wrapX: false
        })

        const draw = new Draw({
          source: source,
          type: 'LineString'
        })
        this.$ol.map.addInteraction(draw)
        this.$ol.tracks.getLayers().push(new TrackLayer({
          title: 'New Track',
          source
        }))
        draw.on('drawend', (event) => {
          console.log('drawend')
          this.$ol.map.removeInteraction(draw)
          this.drawing = false

          store.commit('tracks/storeTracks', this.$ol.map)
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.ol-drawbutton
  position: absolute
  top: 6.5em
  right: 0.5em
</style>
