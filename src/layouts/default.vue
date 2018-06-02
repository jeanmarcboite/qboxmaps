<template>
<q-layout view="lHh Lpr lFf">
  <q-layout-drawer ref="drawer" v-model="layerSwitcherOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null" overlay>
  </q-layout-drawer>

  <q-page-container>
    <router-view />
  </q-page-container>
</q-layout>
</template>

<script>
import {
  openURL
} from 'quasar'
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
    openURL
  }
}
</script>

<style>

</style>
