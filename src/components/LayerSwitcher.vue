<template>
<div class="ol-unselectable ol-control ol-layerswitcher">
  <q-btn icon="map" push small rounded @click="handleClick" />
  <q-layout-drawer ref="drawer" side='right' v-model="layerSwitcherOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    overlay>
    <q-list highlight>
      <q-collapsible v-for="(group, gkey) in groups" :key="gkey">
        <template slot="header">
          <q-checkbox v-model="groups[gkey].visible" :label="gkey" @input="checkVisibility"/>
        </template> items...
      </q-collapsible>
    </q-list>
  </q-layout-drawer>
</div>
</template>
<script>
import {
  sync
} from 'vuex-pathify'

export default {
  computed: {
    ...sync('UI', ['layerSwitcherOpen']),
  },
  data() {
    return {
      groups: {},
      itemIsSelected: true,
    }
  },
  mounted: function () {
    console.log('layerSwitcher mounted')
  },
  methods: {
    getGroup(group) {
      const layers = {}
      group.getLayers().forEach(layer => {
        layers[layer.get('title')] = {
          visible: (layer.getVisible()) ? true : false
        }
      })
      return {
        visible: (group.getVisible()) ? true : false,
        layers
      }
    },
    handleClick() {
      this.layerSwitcherOpen = !this.layerSwitcherOpen
      console.log(this.layerSwitcherOpen)
      if (this.layerSwitcherOpen) {
        console.log('get groups')
        for (const key of Object.keys(this.groups)) {
          delete this.groups[key]
        }
        this.$map.getLayers().forEach(group => {
          console.log('Groups: ' + group.get('title'))
          this.groups[group.get('title')] = this.getGroup(group)
        })
        console.log('Groups: ' + JSON.stringify(this.groups))
      }
    },
    checkVisibility() {
      console.log('Groups: ' + JSON.stringify(this.groups))
    },
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
