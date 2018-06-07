<template>
<q-collapsible indent icon-toggle>
  <template slot="header">
      <q-toggle v-model="visible" :label="group.get('title')"
        checked-icon="visibility"
        unchecked-icon="visibility_off"
        color="orange"
        @input="oninput"
      />
    </template>
  <q-list highlight inset-separator>
    <Layer v-for="(layer, key) in layers" :ref="key" :key="key" :layer.sync="layer" />
  </q-list>
</q-collapsible>
</template>

<script>
import Layer from './Layer.vue'
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
