<template>
<q-item>
  <q-item-side>
    <q-checkbox v-model="visible" checked-icon="visibility" unchecked-icon="visibility_off" color="teal" />
  </q-item-side>
  <q-item-main>
    <q-item-tile ref="layerTitle">
      {{layer.get('title')}}
    </q-item-tile>
  </q-item-main>
</q-item>
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
        // console.log('set ' + this.layer.get('title') + ' visibility ' + visibility)
        this.layer.setVisible(visibility)
        // console.log('layer: ' + this.layer.get('title') + ((this.visible) ? ' visible' : ''))
      }
    }
  },
  mounted: function () {},
  methods: {}
}
</script>
