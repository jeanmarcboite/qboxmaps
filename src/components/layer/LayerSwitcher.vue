<template>
<q-item>
  <q-item-side>
    <q-checkbox v-model="visible" checked-icon="visibility" unchecked-icon="visibility_off" color="teal" />
  </q-item-side>
  <q-context-menu>
    <q-color-picker v-model="color" @input="colorInput" />
    <q-slider v-model="width" :min="1" :max="10" :step="1" label snap @input="widthInput" />
  </q-context-menu>
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
    return {
      color: 'amber',
      width: 5
    }
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
  mounted: function () {
    const layer = this.layer
    const map = this.$map

    this.$refs.layerTitle.$el.addEventListener('click', function () {
      map.getView().fit(layer.extent)
    })
  },
  methods: {
    colorInput: function (color) {
      this.layer.setColor(color)
      this.$store.commit('tracks/store', this.$map)
    },
    widthInput: function (width) {
      console.log('setWidth')
      this.layer.setWidth(width)
      this.$store.commit('tracks/store', this.$map)
    }
  }
}
</script>
