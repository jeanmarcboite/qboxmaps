<template>
<div>
  <TrackLoader/>
  <LayerSwitcher/>
  <TrackSwitcher/>
</div>
</template>

<script>
import Fullscreen from 'ol/control/fullscreen'
import Scaleline from 'ol/control/scaleline'
import OverviewMap from 'ol/control/overviewmap'
// import OlLayerSwitcher from 'ol-layerswitcher'
import Geocoder from 'ol-geocoder'
import Geolocator from 'src/ol/control/geolocator'
import TrackSwitcher from 'src/components/TrackSwitcher'
import LayerSwitcher from 'src/components/layer/Switcher'
import TrackLoader from 'src/components/layer/TrackLoader'
import store from 'src/store'
import listLayers from 'src/ol/layer/list'

import {
  sync
} from 'vuex-pathify'
export default {
  data() {
    return {}
  },
  components: {
    LayerSwitcher,
    TrackSwitcher,
    TrackLoader
  },
  computed: {
    ...sync('layers', ['visible'])
  },
  mounted: function () {
    const self = this
    const geocoder = new Geocoder('nominatim', {
      provider: 'osm',
      key: '__some_key__',
      lang: 'en-US', // en-US, fr-FR
      placeholder: 'Search for ...',
      targetType: 'glass-button',
      limit: 5,
      autoComplete: true,
      keepOpen: false,
      preventDefault: true,
    })
    geocoder.on('addresschosen', function (event) {
      console.dir(event)
      event.target.map_.getView().setCenter(event.coordinate)
    })

    this.$map.addControl(new Fullscreen())
    this.$map.addControl(new Scaleline())
    this.$map.addControl(new OverviewMap())
    this.$map.addControl(new Geolocator())
    // this.$map.addControl(new OlLayerSwitcher())
    this.$map.addControl(geocoder)
    // this.$map.addControl(new TrackSwitcher())

    listLayers(this.$map).forEach(function (layer) {
      layer.setVisible(self.visible[layer.get('title')])
    })
    this.$map.on('moveend', function (event) {
      store.commit('view/setView', {
        zoom: event.map.getView().getZoom(),
        center: event.map.getView().getCenter()
      })
    })
  }
}
</script>

<style lang='stylus'>
.ol-scale-line
  position: absolute
  bottom: 4.5em
  left: 7.5em
</style>
