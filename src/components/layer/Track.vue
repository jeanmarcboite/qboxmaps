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
    <q-item-tile ref="trackTitle">
      {{track.get('title')}}
    </q-item-tile>
  </q-item-main>
</q-item>
</template>
<script>
export default {
  props: [
    'track'
  ],
  data() {
    return {
      color: this.track.color,
      width: this.track.width
    }
  },
  computed: {
    visible: {
      get: function () {
        return this.track.getVisible()
      },
      set: function (visibility) {
        // console.log('set ' + this.track.get('title') + ' visibility ' + visibility)
        this.track.setVisible(visibility)
        // console.log('track: ' + this.track.get('title') + ((this.visible) ? ' visible' : ''))
      }
    }
  },
  mounted: function () {
    const track = this.track
    const map = this.$ol.map

    this.$refs.trackTitle.$el.addEventListener('click', function () {
      map.getView().fit(track.extent)
    })
  },
  methods: {
    colorInput: function (color) {
      this.track.setColor(color)
      this.$store.commit('tracks/storeTracks', this.$ol.map)
    },
    widthInput: function (width) {
      this.track.setWidth(width)
      this.$store.commit('tracks/storeTracks', this.$ol.map)
    }
  }
}
</script>
