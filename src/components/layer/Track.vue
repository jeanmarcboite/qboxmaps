<template>
  <q-item>
    <q-item-side>
      <q-checkbox v-model="visible" checked-icon="visibility" unchecked-icon="visibility_off" color="teal" />
    </q-item-side>
    <q-context-menu>
      <q-input v-model="title" />
      <b>{{track.get('title')}}</b>
      <q-color-picker v-model="color" @input="colorInput" />
      <q-slider v-model="width" :min="1" :max="10" :step="1" label snap @input="widthInput" />
      <q-chips-input dense color="primary" v-model="tags" placeholder="Select from list or add new one" stack-label="List of tags" @duplicate="duplicate" @input="oninput">
        <q-autocomplete :static-data="{field: 'label', list: tagMap}" />
      </q-chips-input>
    </q-context-menu>
    <q-item-main>
      <q-item-tile ref="trackTitle">
        {{track.get('title')}}
      </q-item-tile>
    </q-item-main>
  <q-item-side>
     <q-btn push round color="blue" text-color="black" @click="onedit">
    <q-icon name="edit" />
  </q-btn>
       <q-btn push round color="amber" text-color="black" @click="ondelete">
   <q-icon name="delete" />
  </q-btn>
    </q-item-side>
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
        visible: true,
        title: this.track.get('title'),
        tags: this.track.tags,
      }
    },
    watch: {
      visible: function(val) {
        this.track.setVisible(val)
        // console.log('track: ' + this.track.get('title') + ((this.track.getVisible()) ? ' visible' : ''))
      },
      title: function(val) {
        this.track.setName(val)
      }
    },
    computed: {
      ...sync('tracks', ['tagList']),
      tagMap: function() {
        return this.tagList.map(label => {
          return {
            label
          }
        })
      },
    },
    mounted: function() {
      const track = this.track
      const map = this.$ol.map

      this.$refs.trackTitle.$el.addEventListener('click', function() {
        if (track.extent) {
          map.getView().fit(track.extent)
        }
      })
    },
    methods: {
      colorInput: function(color) {
        this.track.setColor(color)
      },
      widthInput: function(width) {
        this.track.setWidth(width)
      },
      onhide: function() {
        this.shown = false
      },
      oninput: function(model) {
        this.tags.forEach(tag => {
          if (!this.tagList.includes(tag)) {
            this.tagList.push(tag)
          }
        })
        this.track.tags = this.tags
        this.$store.commit('tracks/storeTrack', this.track)
      },
      onedit: function() {
        console.log('edit')
        console.dir(this.track.source)
      },
      ondelete: function() {
        this.track.remove(this.$ol.tracks)
        this.$emit('delete')
      },
       duplicate(label) {
        this.$q.notify(`"${label}" already in list`)
      }
    }
  }
</script>
