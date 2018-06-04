<template>
<div class="ol-unselectable ol-control ol-layerswitcher">
  <q-btn icon="map" push small rounded @click="handleClick" />
  <q-layout-drawer ref="drawer" side="right" v-model="layerSwitcherOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    overlay>
    <q-list highlight>
      <LayerGroupSwitcher v-for="(group, key) in groups()" :key="key" :group="group" />
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
    groupsc: function () {
      console.log('get groups' + ((this.$map) ? '' : ' [no map]'))
      return (this.$map) ? this.$map.getLayers().getArray() : []
    }
  },
  methods: {
    groups() {
      console.log('get groups()' + ((this.$map) ? '' : ' [no map]'))
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
    top: 0.5em
    right: 3.5em
    text-align: left
</style>
