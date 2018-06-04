<template>
<div>
  <q-toggle v-model="visible" :label="layer.get('title')" checked-icon="visibility" unchecked-icon="visibility_off" color="teal"
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
      visible: (this.layer.getVisible()) ? true : false
    }
  },
  methods: {
    oninput: function () {
      console.log('layer: ' + this.layer.get('title') + ((this.visible) ? ' visible' : ''))
    }
  }
}
</script>
