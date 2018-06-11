<template>
<q-item>
  <q-item-side>
    <q-checkbox v-model="visible" checked-icon="visibility" unchecked-icon="visibility_off" color="teal" />
  </q-item-side>
  <q-context-menu>
    <b>{{track.get('title')}}</b>
    <q-color-picker v-model="color" @input="colorInput" />
    <q-slider v-model="width" :min="1" :max="10" :step="1" label snap @input="widthInput" />
    <q-chips-input dense color="primary" v-model="tags" placeholder="Select from list or add new one" stack-label="List of tags"
      @duplicate="duplicate" @input="oninput">
      <q-autocomplete :static-data="{field: 'label', list: tagMap}" />
    </q-chips-input>
  </q-context-menu>
  <q-item-main>
    <q-item-tile ref="trackTitle">
      {{track.get('title')}}
    </q-item-tile>
  </q-item-main>
</q-item>
</template>
<script>
import {
  sync
} from 'vuex-pathify'

export default {
  props: [
    'track'
  ],
  data() {
    return {
      color: this.track.color,
      width: this.track.width,
      shown: true,
      tags: this.track.tags || [],
    }
  },
  computed: {
    ...sync('tracks', ['tagList']),
    tagMap: function () {
      return this.tagList.map(label => {
        return {
          label
        }
      })
    },
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
    },
    onhide: function () {
      this.shown = false
    },
    oninput: function (model) {
      this.tags.forEach(tag => {
        if (!this.tagList.includes(tag)) {
          this.tagList.push(tag)
        }
      })
      this.track.tags = this.tags
      this.$store.commit('tracks/storeTracks', this.$ol.map)
    },
    duplicate(label) {
      this.$q.notify(`"${label}" already in list`)
    }
  }
}
</script>
