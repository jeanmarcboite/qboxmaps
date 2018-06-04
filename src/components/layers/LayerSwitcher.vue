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
    return {
      visiblee: (this.layer.getVisible()) ? true : false
    }
  },
  computed: {
    visible: {
      get: function () {
        return this.layer.getVisible()
      },
      set: function (visibility) {
        this.layer.setVisible(visibility)
      }
    }
  },
  methods: {
    oninput: function () {
      console.log('layer: ' + this.layer.get('title') + ((this.visiblee) ? ' visible' : ''))
    }
  }
}
</script>
