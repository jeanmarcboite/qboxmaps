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
import Style from 'ol/style/style'
import Fill from 'ol/style/fill'
import Stroke from 'ol/style/stroke'
import Circle from 'ol/style/circle'
import VectorSource from 'ol/source/vector'
import Track from 'src/ol/layer/Track'

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
      
      const style = new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new Stroke({
            color: '#ffcc00',
            width: 4
          }),
          image: new Circle({
            radius: 7,
            fill: new Fill({
              color: '#ff0000'
            })
          })
        })

      if (this.drawing) {
        console.log('startDraw')

        var source = new VectorSource({
          wrapX: false
        })
      
        const modify = new Modify({source: source})
        this.$ol.map.addInteraction(modify)

        const draw = new Draw({
          source: source,
          freehand: false,
          type: 'LineString'
        })
        
        const snap = new Snap({source: source})
        
        this.$ol.map.addInteraction(draw)
        this.$ol.map.addInteraction(snap)
        
        this.$ol.tracks.getLayers().push(new Track({
          title: 'New Track',
          source,
          style
        }))
        draw.on('drawend', (event) => {
          console.log('drawend')
          event.preventDefault()
          this.$ol.map.removeInteraction(draw)
          this.$ol.map.removeInteraction(snap)
          this.drawing = false
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
