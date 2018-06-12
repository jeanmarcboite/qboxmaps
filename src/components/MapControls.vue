<template>
<div>
  <LayerSwitcher/>
  <TrackSwitcher :tracks="tracks()" />
  <Draw/>
</div>
</template>

<script>
import Fullscreen from 'ol/control/fullscreen'
import Scaleline from 'ol/control/scaleline'
import OverviewMap from 'ol/control/overviewmap'
// import OlLayerSwitcher from 'ol-layerswitcher'
import Geocoder from 'ol-geocoder'
import Geolocator from 'src/ol/control/geolocator'
import TrackSwitcher from 'src/components/layer/TrackSwitcher'
import LayerSwitcher from 'src/components/layer/LayerSwitcher'
import Draw from 'src/components/Draw'
import store from 'src/store'
import listLayers from 'src/ol/layer/list'

import {
  sync
} from 'vuex-pathify'
export default {
  components: {
    LayerSwitcher,
    TrackSwitcher,
    Draw
  },
  computed: {
    ...sync('layers', ['visible'])
  },
  methods: {
    tracks: function () {
      return this.$ol.tracks.getLayers().getArray()
    },
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

    this.$ol.map.addControl(new Fullscreen())
    this.$ol.map.addControl(new Scaleline())
    this.$ol.map.addControl(new OverviewMap())
    this.$ol.map.addControl(new Geolocator())
    // this.$ol.map.addControl(new OlLayerSwitcher())
    this.$ol.map.addControl(geocoder)
    // this.$ol.map.addControl(new TrackSwitcher())

    listLayers(this.$ol.map).forEach(function (layer) {
      layer.setVisible(self.visible[layer.get('title')])
    })
    this.$ol.map.on('moveend', function (event) {
      store.commit('view/setView', {
        zoom: event.map.getView().getZoom(),
        center: event.map.getView().getCenter()
      })
    })
  },
}
</script>

<style lang='stylus'>
.ol-scale-line
  position: absolute
  bottom: 4.5em
  left: 7.5em
.ol-trackswitcher
  position: absolute
  top: 4.5em
  right: 0.5em
  text-align: left
</style>
