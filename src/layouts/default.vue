<template>
<q-layout view="lHh Lpr lFf" class="qdrawer">
  <q-layout-drawer ref="drawer" side='right' @click="drawerClick" v-model="layerSwitcherOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null" overlay>
    <div class="list">
      <q-collapsible icon="explore" label="First">
        <div>
          Content
        </div>
      </q-collapsible>
      <q-collapsible icon="perm_identity" label="Second">
        <div>
          Content
        </div>
      </q-collapsible>
      <q-collapsible icon="shopping_cart" label="Third">
        <div>
          Content
        </div>
      </q-collapsible>
    </div>
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
      console.log('drawerClick = this.layerSwitcherOpen = false')
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'
</style>
