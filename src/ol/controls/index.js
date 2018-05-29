import Fullscreen from 'ol/control/fullscreen'
import control from 'ol/control'
import Scaleline from 'ol/control/scaleline'
import OverviewMap from 'ol/control/overviewmap'
import LayerSwitcher from 'ol-layerswitcher'
import Geocoder from 'ol-geocoder'
import Geolocator from './geolocator'
import TrackSwitcher from './trackswitcher'

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

const controls = control.defaults().extend([
        new Fullscreen(),
        new Scaleline(),
        new OverviewMap(),
        new LayerSwitcher(),
        geocoder,
        new Geolocator(),
        new TrackSwitcher()
      ])

geocoder.on('addresschosen', function (event) {
  console.dir(event)
  event.target.map_.getView().setCenter(event.coordinate)
})

export default controls
