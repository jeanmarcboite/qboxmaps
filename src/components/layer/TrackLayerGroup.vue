<template>
<q-list highlight inset-separator>
  <Layer v-for="(layer, key) in layers()" :ref="key" :key="key" :layer.sync="layer" />
</q-list>
</template>

<script>
import Layer from './TrackLayer.vue'
export default {
  components: {
    Layer
  },
  computed: {
    layerscount: function () {
      console.log('get tracks')
      return this.$ol.tracks.getLayers().getArray().length
    },
  },
  watch: {
    // à chaque fois que la question change, cette fonction s'exécutera
    trrr: function (newQuestion, oldQuestion) {
      console.log('count changed')
    }
  },
  data() {
    return {
      trrr: 4
    }
  },
  methods: {
    oninput: function () {},
    updated: function () {
      console.log('TrackLayerGroup updated')
    },
    layers: function () {
      console.log('get tracks')
      return this.$ol.tracks.getLayers().getArray()
    },
  }
}
</script>
