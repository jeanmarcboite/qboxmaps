<template>
<div>
  <LayerSwitcher/>
  <TrackSwitcher :tracks="tracks()" />
  <Draw v-if="false"/>
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
  props: {
    'target': {
      default: 'map',
      type: String
    }
  },
  computed: {
    ...sync('layers', ['visible']),
    ...sync('OL', ['map'])
  },
  methods: {
    tracks: function () {
      return this.map.tracks.getLayers().getArray()
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
      store.commit('OL/setCenter', {
        target: this.target,
          center: event.coordinate
      })
    })
    store.commit('OL/addControl', {
      target: this.target,
      control: geocoder
    })

  const controls = [
    new Fullscreen(),
    new Scaleline(),
    new OverviewMap(),
    new Geolocator()
    ]
  
  for (let c = 0; c < controls.length; c++) {
      store.commit('OL/addControl', {
        target: this.target,
        control: controls[c]
      })
    }
    listLayers(this.map).forEach(function (layer) {
      layer.setVisible(self.visible[layer.get('title')])
    })
    this.map.on('moveend', function (event) {
      // console.log('moveend')
      store.commit('view/setView', {
        target: this.target,
        zoom: event.map.getView().getZoom(),
        center: event.map.getView().getCenter()
      })
    })
  },
}
</script>

<style lang='stylus'>
.ol-scale-line {
  position: absolute;
  bottom: 4.5em;
  left: 7.5em;
}

.ol-trackswitcher {
  position: absolute;
  top: 4.5em;
  right: 0.5em;
  text-align: left;
}
</style>
