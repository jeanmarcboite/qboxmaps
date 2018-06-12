<template>
<div class="ol-unselectable ol-control ol-drawbutton">
  <q-btn push small round @click="handleClick">
    <q-icon name="timeline" style="font-size: 1em;" />
  </q-btn>
</div>
</template>
<script>
import {
  sync
} from 'vuex-pathify'
export default {
  components: {},
  computed: {
    ...sync('tracks', ['tagList']),
  },
  data: function () {
    return {
      d: false
    }
  },
  methods: {
    handleClick: function () {
      console.log('startDraw')
    }
  }
}
</script>

<style lang="stylus">
.ol-drawbutton
  position: absolute
  top: 6.5em
  right: 0.5em
</style>
