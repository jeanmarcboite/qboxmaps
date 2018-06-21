<template>
<q-page class="flex flex-center">
  <Map/>
  <MapControls/>
</q-page>
</template>

<style>

</style>

<script>
import Map from 'src/components/Map'
import MapControls from 'src/components/MapControls'

export default {
  name: 'App',
  components: {
    Map,
    MapControls
  },
}
</script>

<style lang="stylus">
@import "~ol/ol.css";
@import "../css/ol-geocoder.css";
@import "~ol-layerswitcher/src/ol-layerswitcher.css";
.ol-geolocator
  top: 7em
  left: 0.5em
.ol-scale-line
  left: 2.5em
#v
  position: absolute
  top: 14.5em
  left: 1.5em
  display: flex
  flex-direction: column
#qbtn
  position: absolute
  top: 12.5em
  left: 1.5em
  size: xs
#qbtngroup
  position: absolute
  top: 1.5em
  right: 25em

</style>
