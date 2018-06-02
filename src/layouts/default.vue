<template>
<q-layout view="lHh Lpr lFf">
  <q-layout-drawer ref="drawer" side='right' @click="drawerClick" v-model="layerSwitcherOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null" overlay>
  </q-layout-drawer>

  <q-page-container>
    <router-view />
  </q-page-container>
</q-layout>
</template>

<script>
import {
  sync
} from 'vuex-pathify'

export default {
  name: 'LayoutDefault',
  computed: {
    ...sync('UI', ['layerSwitcherOpen']),
  },
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    }
  },
  methods: {
    onmouseout: function () {
      console.log('onmouseout = this.layerSwitcherOpen = false')
    },
    drawerClick: function () {
      this.layerSwitcherOpen = false
    }
  }
}
</script>

<style lang="stylus">
.q-layout-drawer
  background-color: red
</style>
