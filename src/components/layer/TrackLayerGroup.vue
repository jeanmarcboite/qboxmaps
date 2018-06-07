<template>
<q-list highlight inset-separator>
  <Layer v-for="(layer, key) in layers" :ref="key" :key="key" :layer.sync="layer" />
</q-list>
</template>

<script>
import Layer from './TrackLayer.vue'
export default {
  components: {
    Layer
  },
  props: [
    'group'
  ],
  computed: {
    layers: function () {
      return this.group.getLayers().getArray()
    },
    visible: {
      get: function () {
        return this.group.getVisible()
      },
      set: function (visibility) {
        this.group.setVisible(visibility)
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    oninput: function () {},
  }
}
</script>
