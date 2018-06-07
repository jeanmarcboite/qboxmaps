<template>
<div class="ol-unselectable ol-control ol-trackswitcher">
  <q-context-menu>
    <q-list highlight>
      <LayerGroup v-for="(group, key) in groups()" v-if="group.get('type') == 'track'" :key="key" :group="group" />
    </q-list>
  </q-context-menu>
  <input type="file" :id="id" accept=".gpx" multiple style="display: none;" />
  <q-btn push small round @click="handleClick">
    <q-icon name="directions_walk" style="font-size: 1em;" />
  </q-btn>
</div>
</template>

<script>
import {
  sync
} from 'vuex-pathify'

import LayerGroup from './TrackLayerGroup.vue'
import readFiles from 'src/ol/layer/readfiles'

export default {
  components: {
    LayerGroup
  },
  computed: {
    ...sync('UI', ['trackSwitcherOpen']),
  },
  data: function () {
    return {
      id: 'TrackSwitcher/inputID'
    }
  },
  mounted: function () {
    document.getElementById(this.id).onchange = readFiles({
      map: this.$map,
      store: this.$store
    })
  },
  methods: {
    groups() {
      return (this.$map) ? this.$map.getLayers().getArray() : []
    },
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
