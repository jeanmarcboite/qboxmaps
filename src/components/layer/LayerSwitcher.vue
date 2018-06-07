<template>
<div class="ol-unselectable ol-control ol-layerswitcher">
  <q-btn push small round @click="handleClick">
    <q-icon name="layers" style="font-size: 1em;" />
  </q-btn>
  <q-layout-drawer side="right" v-model="layerSwitcherOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null" overlay>
    <q-list highlight v-if="layerSwitcherOpen && $map">
      <LayerGroup v-for="(group, key) in groups()" v-if="group.get('mapLayer')" :key="key" :group="group" />
    </q-list>
  </q-layout-drawer>
</div>
</template>

<script>
import {
  sync
} from 'vuex-pathify'

import LayerGroup from './LayerGroup.vue'

export default {
  components: {
    LayerGroup
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
