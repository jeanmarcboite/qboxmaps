<template>
<div></div>
</template>

<script>
import {
  sync
} from 'vuex-pathify'

export default {
  computed: {
    ...sync('view', ['zoom', 'center', 'trackColor']),
  },
  data() {
    return {}
  },
  mounted: function () {
    this.$map.getView().setCenter(this.center)
    this.$map.getView().setZoom(this.zoom)
  }
}
</script>

<style>

</style>
