<template>
<div class="ol-unselectable ol-control ol-trackloader">
  <input type="file" :id="id" accept=".gpx" multiple style="display: none;" />
  <q-btn push small round @click="handleClick">
    <q-icon name="fas fa-folder-open" style="font-size: 1em;" />
  </q-btn>
</div>
</template>

<script>
import readFiles from 'src/ol/layer/readfiles'
export default {
  components: {},
  data: function () {
    return {
      id: 'openTrack'
    }
  },
  mounted: function () {
    document.getElementById(this.id).onchange = readFiles({
      map: this.$map,
      store: this.$store
    })
  },
  methods: {
    handleClick() {
      const el = document.getElementById(this.id)
      if (el) {
        el.click()
      }
    }
  }
}
</script>

<style lang="stylus">
.ol-trackloader
    position: absolute
    top: 4.5em
    right: 0.5em
</style>
