<template>
<div class="ol-unselectable ol-control ol-layerswitcher">
  <q-btn icon="map" push small round @click="handleClick" />
  <q-layout-drawer side="right" v-model="layerSwitcherOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null" overlay>
    <q-list highlight v-if="layerSwitcherOpen && $map">
      <LayerGroupSwitcher v-for="(group, key) in groups()" :key="key" :group.sync="group" />
    </q-list>
  </q-layout-drawer>
</div>
</template>

<script>
import {
  sync
} from 'vuex-pathify'

import LayerGroupSwitcher from './LayerGroupSwitcher.vue'

export default {
  components: {
    LayerGroupSwitcher
  },
  computed: {
    ...sync('UI', ['layerSwitcherOpen']),
  },
  methods: {
    groups() {
      return (this.$map) ? this.$map.getLayers().getArray() : []
    },
    handleClick() {
      this.layerSwitcherOpen = !this.layerSwitcherOpen
    }
  }
}
</script>

<style lang="stylus">
.ol-layerswitcher
    position: absolute
    top: 2.5em
    right: 0.5em
    text-align: left
</style>
