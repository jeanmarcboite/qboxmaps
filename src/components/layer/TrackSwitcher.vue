<template>
<div class="ol-unselectable ol-control ol-trackswitcher">
  <q-context-menu>
    <b>Tracks</b>
    <LayerGroup :group="tracks" />
  </q-context-menu>
  <input type="file" :id="id" accept=".gpx" multiple style="display: none;" />
  <q-btn push small round @click="handleClick">
    <q-icon name="directions_walk" style="font-size: 1em;" />
  </q-btn>
</div>
</template>

<script>
import LayerGroup from './TrackLayerGroup.vue'
import readFiles from 'src/ol/layer/readfiles'

export default {
  components: {
    LayerGroup
  },
  props: ['tracks'],
  computed: {},
  data: function () {
    return {
      id: 'TrackSwitcher/inputID'
    }
  },
  mounted: function () {
    document.getElementById(this.id).onchange = readFiles({
      map: this.$ol.map,
      tracks: this.$ol.tracks,
      store: this.$store
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
