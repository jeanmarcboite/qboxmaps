<template>
<div class="ol-unselectable ol-control ol-trackswitcher">
  <q-btn push small round @click="handleClick">
    <q-icon name="directions_walk" style="font-size: 1em;" />
  </q-btn>
  <q-layout-drawer side="right" v-model="trackSwitcherOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null" overlay>
    <q-list highlight v-if="trackSwitcherOpen && $map">
      <LayerGroup v-for="(group, key) in groups()" v-if="group.get('trackLayer')" :key="key" :group="group" />
    </q-list>
  </q-layout-drawer>
</div>
</template>

<script>
import {
  sync
} from 'vuex-pathify'

import LayerGroup from './TrackLayerGroup.vue'

export default {
  components: {
    LayerGroup
  },
  computed: {
    ...sync('UI', ['trackSwitcherOpen']),
  },
  methods: {
    groups() {
      return (this.$map) ? this.$map.getLayers().getArray() : []
    },
    handleClick() {
      this.trackSwitcherOpen = !this.trackSwitcherOpen
    }
  }
}
</script>

<style lang="stylus">
</style>
