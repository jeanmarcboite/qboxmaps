<template>
<div>
  <q-list>
    <q-checkbox v-model="checked" v-for="tag in tagList" :key="tag" :val="tag" :label="tag" />
  </q-list>
  <p class="caption">
    <q-btn label="Uncheck all tags" @click="unselectAll" v-if="checked.length > 0" />
  </p>
  <q-list highlight inset-separator>
    <Track v-for="(track, key) in tracks()" :key="key" :track="track" @delete="$emit('update')"/>
  </q-list>
</div>
</template>

<script>
import {
  sync
} from 'vuex-pathify'
import Track from './Track.vue'
export default {
  components: {
    Track
  },
  computed: {
    ...sync('tracks', ['tagList']),
  },
  data: function () {
    return {
      checked: [],
    }
  },
  methods: {
    tracks: function () {
      return this.$ol.tracks.getLayers().getArray().filter(track => {
        var ok = true
        this.checked.forEach(tag => {
          ok = ok && (track.tags.includes(tag))
        })
        return ok
      }).sort((a, b) => a.timestamp < b.timestamp)
    },
    unselectAll: function () {
      while (this.checked.length > 0) {
        this.checked.pop()
      }
    }
  }
}
</script>
