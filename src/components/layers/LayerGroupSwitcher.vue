<template>
<q-collapsible>
  <template slot="header">
      <q-checkbox v-model="visible" :label="group.get('title')"
        checked-icon="visibility"
        unchecked-icon="visibility_off"
        color="teal"
        @input="oninput"
      />
    </template> ..layerSwitcher
</q-collapsible>
</template>

<script>
export default {
  props: [
    'group'
  ],
  computed: {},
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
