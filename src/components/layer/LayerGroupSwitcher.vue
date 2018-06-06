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
    <LayerSwitcher v-for="(layer, key) in layers" :ref="key" :key="key" :layer.sync="layer" />
  </q-list>
</q-collapsible>
</template>

<script>
import LayerSwitcher from './LayerSwitcher.vue'
export default {
  components: {
    LayerSwitcher
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
        console.log('set ' + this.group.get('title') + ' visibility ' + visibility)
        this.group.setVisible(visibility)
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    oninput: function () {
      console.log('group: ' + this.group.get('title') + ((this.visible) ? ' visible' : ''))
    },
  }
}
</script>
