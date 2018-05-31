<template>
<div></div>
</template>

<script>
import Fullscreen from 'ol/control/fullscreen'
import store from 'src/store'
import listLayers from 'src/ol/layers/list'
import {
  sync
} from 'vuex-pathify'
export default {
  data() {
    return {}
  },
  computed: {
    ...sync('layers', ['visible'])
  },
  mounted: function () {
    const self = this

    this.$map.addControl(new Fullscreen())
    listLayers(this.$map).forEach(function (layer) {
      layer.setVisible(self.visible[layer.get('title')])
    })
    this.$map.on('moveend', function (event) {
      store.commit('view/setView', {
        zoom: event.map.getView().getZoom(),
        center: event.map.getView().getCenter()
      })
    })
  }
}
</script>

<style>

</style>
