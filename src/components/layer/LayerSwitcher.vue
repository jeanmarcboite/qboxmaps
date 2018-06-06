<template>
<q-item @input="oninput">
  <q-item-side>
    <q-checkbox v-model="visible" checked-icon="visibility" unchecked-icon="visibility_off" color="teal" />
  </q-item-side>
  <q-context-menu>
    <q-list link separator style="min-width: 150px; max-height: 300px;">
      <q-item v-close-overlay>
        <q-item-main label="Label" sublabel="Value" />
      </q-item>

      <q-item v-close-overlay>
        <q-item-main label="Other Label" sublabel="Other Value" />
      </q-item>
    </q-list>
  </q-context-menu>
  <q-item-main>
    <q-item-tile @input="oninput">
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
