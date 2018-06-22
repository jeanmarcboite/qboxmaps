<template>
<div class="ol-unselectable ol-control ol-drawbutton">
  <q-btn push small round @click="handleClick" title="draw a new track (press shift for free hand drawing)">
    <q-icon name="timeline" style="font-size: 1em;" v-if="!drawing" />
    <q-icon name="touch_app" style="font-size: 1em;" v-if="drawing" />
  </q-btn>
</div>
</template>
<script>
import Draw from 'ol/interaction/draw'
import Modify from 'ol/interaction/modify'
import Snap from 'ol/interaction/snap'
import VectorSource from 'ol/source/vector'
import Track from 'src/ol/layer/Track'
import { drawStyle } from 'src/ol/layer/style'
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
  props: {
    'target': {
      default: 'map',
      type: String
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
      
        const modify = new Modify({source: source})
        this.$store.commit('OL/addInteraction', {
          name: this.target, 
          interaction: modify
          })

        const draw = new Draw({
          source: source,
          freehand: false,
          type: 'LineString'
        })
        
        const snap = new Snap({source: source})

        for (let interaction in [modify, draw, snap]) {
          this.$store.commit('OL/addInteracton', {
            name: this.target,
            interaction
          })
        }
        
        const track = new Track({
          title: 'New Track',
          source,
          style: drawStyle
        })

          this.$store.commit('OL/pushTrack', {
            name: this.target,
            track
          })
        
        draw.on('drawend', (event) => {
          console.log('drawend')
          event.preventDefault()
          this.drawing = false
           this.$store.commit('OL/storeTrack', {
            name: this.target,
            track
          })
       })
         modify.on('modifyend', (event) => {
          console.log('modifyend')
          this.$store.commit('OL/storeTrack', {
            name: this.target,
            track
          })
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.ol-drawbutton {
  position: absolute;
  top: 6.5em;
  right: 0.5em;
}
</style>
