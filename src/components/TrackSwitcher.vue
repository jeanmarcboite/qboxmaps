<template>
<div class="ol-unselectable ol-control ol-trackswitcher">
  <button type="button">
{{value}}
</button>
</div>
</template>

<script>
import {
  sync
} from 'vuex-pathify'

export default {
  computed: {
    ...sync('view', ['zoom', 'center', 'trackColor']),
  },
  data() {
    return {
      value: '\u2933'
    }
  },
}
</script>

<style lang="stylus">
@import "../css/ol-trackswitcher.css";
</style>
