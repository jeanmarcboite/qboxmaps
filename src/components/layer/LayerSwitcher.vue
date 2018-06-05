<template>
<div>
  <q-checkbox v-model="visible" :label="layer.get('title')" checked-icon="visibility" unchecked-icon="visibility_off" color="teal"
    @input="oninput" />
</div>
</template>
<script>
export default {
  props: [
    'layer'
  ],
  data() {
    return {}
  },
  computed: {
    visible: {
      get: function () {
        return this.layer.getVisible()
      },
      set: function (visibility) {
        console.log('set ' + this.layer.get('title') + ' visibility ' + visibility)
        this.layer.setVisible(visibility)
        console.log('layer: ' + this.layer.get('title') + ((this.visible) ? ' visible' : ''))
      }
    }
  },
  methods: {
    oninput: function () {
      console.log('oninput, layer: ' + this.layer.get('title') + ((this.visible) ? ' visible' : ''))
    }
  }
}
</script>
