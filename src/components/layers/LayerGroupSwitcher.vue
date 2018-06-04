<template>
<q-collapsible indent icon-toggle>
  <template slot="header">
      <q-checkbox v-model="visible" :label="group.get('title')"
        checked-icon="visibility"
        unchecked-icon="visibility_off"
        color="orange"
        @input="oninput"
      />
    </template>
  <LayerSwitcher v-for="(layer, key) in layers" :key="key" :layer="layer" />
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
    }
  },
  data() {
    return {
      visible: (this.group.getVisible()) ? true : false
    }
  },
  methods: {
    oninput: function () {
      console.log('group: ' + this.group.get('title') + ((this.visible) ? ' visible' : ''))
    }
  }
}
</script>
