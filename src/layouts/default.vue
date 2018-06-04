<template>
<q-layout view="lHh Lpr lFf">
  <q-page-container>
    <router-view />
  </q-page-container>
</q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'
</style>
